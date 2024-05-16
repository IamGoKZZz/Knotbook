function downloadPDFFromBase64(pdfString,noteName) {

    console.log("inside download from pdf")
    // Example usage

const fileName = noteName+".pdf";
    // Decode Base64 string to binary data
    const binaryData = atob(pdfString);
    // Convert binary string to ArrayBuffer
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }
    // Create Blob from ArrayBuffer
    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    // Create object URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

