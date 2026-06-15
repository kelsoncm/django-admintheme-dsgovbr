import os
import re
from compressor.filters import FilterBase

class ES6BundlerFilter(FilterBase):
    def __init__(self, content, *args, **kwargs):
        super().__init__(content, *args, **kwargs)

    def input(self, **kwargs):
        if not self.filename:
            return self.content

        bundled_files = set()
        bundle_content = []

        def bundle_file(filepath):
            filepath = os.path.abspath(filepath)
            if filepath in bundled_files:
                return
            bundled_files.add(filepath)

            if not os.path.exists(filepath):
                # Try with .js extension if missing
                if not filepath.endswith('.js'):
                    filepath += '.js'
                if not os.path.exists(filepath):
                    raise FileNotFoundError(f"Could not find imported file: {filepath}")

            dirname = os.path.dirname(filepath)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Find all import lines to resolve relative paths
            # Supports:
            # import BRAccordion from '../../components/accordion/accordion'
            # import { Dropdown, Globals } from './globals-class'
            # import 'focus-visible'
            imports = re.findall(r'import\s+(?:[\w\s{},*]+from\s+)?[\'"]([^\'"]+)[\'"]', content)
            
            for imp in imports:
                if imp in ('focus-visible', 'flatpickr', '@popperjs/core'):
                    continue
                # Resolve relative import
                if imp.startswith('.'):
                    imp_path = os.path.join(dirname, imp)
                    bundle_file(imp_path)

            # Process the content line by line to strip import/export statements
            lines = content.splitlines()
            clean_lines = []
            for line in lines:
                stripped = line.strip()
                # Remove/skip import statements
                if stripped.startswith('import '):
                    continue
                
                # Replace export statements
                if stripped.startswith('export default '):
                    # Replace "export default class BRUpload" with "class BRUpload"
                    line = re.sub(r'^export\s+default\s+', '', line)
                elif stripped.startswith('export '):
                    # Replace "export class BRUpload" with "class BRUpload"
                    if not stripped.startswith('export {'):
                        line = re.sub(r'^export\s+', '', line)
                
                clean_lines.append(line)

            file_content = '\n'.join(clean_lines)

            # Replace Popper and Flatpickr imports with global variables if used inside files
            # tooltip.js and behaviors/tooltip.js use createPopper
            file_content = re.sub(
                r'import\s+\{\s*createPopper\s*\}\s+from\s+[\'"]@popperjs/core[\'"]',
                'const createPopper = window.Popper ? window.Popper.createPopper : null;',
                file_content
            )
            # datetimepicker.js uses flatpickr
            file_content = re.sub(
                r'import\s+flatpickr\s+from\s+[\'"]flatpickr[\'"]',
                'const flatpickr = window.flatpickr;',
                file_content
            )

            # Remove multi-line exports (e.g. export { Accordion, ... })
            file_content = re.sub(r'export\s*\{[^}]*\}', '', file_content)

            bundle_content.append(file_content)

        bundle_file(self.filename)
        return '\n'.join(bundle_content)
