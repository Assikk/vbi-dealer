export default function downloadDoc(scan, name) {
    let doc = document.createElement('a');
    doc.href = scan
    doc.setAttribute('download', name);
    document.body.appendChild(doc);
    doc.click();
    open(doc)
}