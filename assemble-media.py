from pathlib import Path
import json,hashlib
root=Path(__file__).resolve().parent
for entry in json.loads((root/'media-parts.json').read_text()):
    target=root/entry['path']
    with target.open('wb') as out:
        for part in entry['parts']:
            out.write((root/part).read_bytes())
    assert hashlib.sha256(target.read_bytes()).hexdigest()==entry['sha256'], target
