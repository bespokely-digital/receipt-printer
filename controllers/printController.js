import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder';

let encoder = new ReceiptPrinterEncoder();

let result = encoder
    .initialize()
    .text('The quick brown fox jumps over the lazy dog')
    .newline()
    .qrcode('https://mikechalemrs.co.uk')
    .encode();


export const connectPrinter = async (req, res) => {
  receiptPrinter.connect();
};

export const printReceipt = async (req, res) => {};