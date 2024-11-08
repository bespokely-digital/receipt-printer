let receiptPrinter;
let lastUsedDevice = null;
const connectButton = document.getElementById('connectPrinter');
const printButton = document.getElementById('printReceipt');

// Load saved device information from localStorage for reconnect
const savedDevice = JSON.parse(localStorage.getItem('lastUsedDevice'));

console.log("savedDevice", savedDevice);
console.log(ReceiptPrinterEncoder.printerModels);

// Initialise printer connection
async function initialisePrinter() {
  receiptPrinter = new WebUSBReceiptPrinter();

  // Try reconnecting if we have saved device information
  // if (savedDevice) {
  //   try {
  //     await receiptPrinter.reconnect(savedDevice);
  //     console.log('Reconnected to previously used printer');
  //     enablePrintButton();
  //   } catch (error) {
  //     console.warn('Failed to reconnect:', error);
  //   }
  // }

  // Listen for "connected" event and store device details
  receiptPrinter.addEventListener('connected', device => {

    console.log('connected', device);

    console.log(`Connected to ${device.manufacturerName} ${device.productName}`);
    
    // codepageMapping = device.codepageMapping || {}; // Use codepageMapping if available, otherwise empty object
    
    console.log("codepageMapping", codepageMapping);
    lastUsedDevice = {
      vendorId: device.vendorId,
      productId: device.productId,
      serialNumber: device.serialNumber
    };
    localStorage.setItem('lastUsedDevice', JSON.stringify(lastUsedDevice)); // Save device for future reconnect
    enablePrintButton();
  });
}

// Connect to Printer Manually
async function handleConnectButtonClick() {
  try {
    await receiptPrinter.connect(); // Manually connect, prompts for USB access
    console.log('Printer connected successfully');
  } catch (error) {
    console.error('Failed to connect to printer:', error);
  }
}

// Print Receipt
// Print Receipt
async function handlePrintButtonClick() {
  try {
    console.log('Starting print job...');
    const encoder = new ReceiptPrinterEncoder({
      language: 'star-prnt',
      codepageMapping: 'star',
      columns: 48,

    });

    const result = encoder
      .initialize()
      .text('Testing 1 2 3')
      .newline()
      .encode();

    console.log('Encoded result:', result);

    await receiptPrinter.print(result);
    console.log('Print command sent to printer.');
  } catch (error) {
    console.error('Failed to print receipt:', error);
  }
}

// Helper function to enable print button
function enablePrintButton() {
  printButton.disabled = false;
}

// Attach event listeners to buttons
connectButton.addEventListener('click', handleConnectButtonClick);
printButton.addEventListener('click', handlePrintButtonClick);

// Initialise the printer connection
initialisePrinter();