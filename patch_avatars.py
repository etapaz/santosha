import glob
import re
import os

mapping = {
    'thierry-van-brabant.html': ('T', 'thierry-van-brabant.jpg', 'Thierry Van Brabant'),
    'julie-van-brabant.html': ('J', 'julie-van-brabant.jpg', 'Julie Van Brabant'),
    'fabienne-weynant.html': ('F', 'fabienne-weynant.jpg', 'Fabienne Weynant'),
    'gwenaelle-wuytack.html': ('G', 'gwenaelle-wuytack.jpg', 'Gwennaëlle Wuytack'),
    'claire-fossay.html': ('C', 'claire-fossay.jpg', 'Claire Fossay'),
    'olga-emina.html': ('O', 'olga-emina.jpg', 'Olga Emina'),
    'jessica.html': ('J', 'jessica.jpg', 'Jessica'),
    'corinne-willame.html': ('C', 'corinne-willame.jpg', 'Corinne Willame'),
    'malgorzata-luczak.html': ('M', 'malgorzata-luczak.jpg', 'Malgorzata Luczak'),
    'morgane-florens.html': ('M', 'morgane-florens.jpg', 'Morgane Florens'),
    'danya-hershkowitz.html': ('D', 'danya-hershkowitz.jpg', 'Danya Hershkowitz'),
    'marie-orban.html': ('M', 'marie-orban.jpg', 'Marie Orban'),
    'ornella-altenloh.html': ('O', 'ornella-altenloh.jpg', 'Ornella Altenloh'),
    'charlotte-krack.html': ('C', 'charlotte-krack.jpg', 'Charlotte Krack'),
    'tereza-topkova.html': ('T', 'tereza-topkova.jpg', 'Tereza Topkova')
}

for filename, (initial, img_name, name) in mapping.items():
    filepath = os.path.join('/Users/nils/Documents/santosha anti/profs', filename)
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        target = re.compile(rf'<div class="teacher-avatar"[^>]*>{initial}</div>', re.MULTILINE | re.DOTALL)
        replacement = f'<div class="teacher-avatar" style="width:180px;height:180px;margin-bottom:2rem;"><img src="../img/{img_name}" alt="{name}"></div>'
        
        new_content, count = target.subn(replacement, content, count=1)
        
        if count > 0:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Patched {filename}")
        else:
            print(f"No match in {filename}")
