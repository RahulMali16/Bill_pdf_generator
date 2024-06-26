
import React from 'react';
import BillDetails from './component/BillDetails.jsx';
import ItemList from './component/ItemList.jsx';
import TotalAmount from './component/TotalAmount.jsx';
import { jsPDF } from 'jspdf';
import './App.css';

function App() {
  const [items, setItems] = React.useState([]);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateTotalAmount = () => {
    return items.reduce(
      (total, item) =>
        total +
        item.quantity *
        item.price, 0);
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();


    pdf.setFontSize(18);
    pdf.text('Invoice', 20, 20);


    items.forEach((item, index) => {

      const yPos = 30 + index * 10;


      pdf.setFontSize(12);
      pdf.text(`Item: ${item.item}`, 20, yPos);
      pdf.text(`Quantity: ${item.quantity}`, 80, yPos);
      pdf.text(`Price: ${item.price}`, 140, yPos);
    });


    const totalAmount = calculateTotalAmount();


    pdf.setFontSize(14);
    pdf.text(`Total Amount: INR:${totalAmount.toFixed(2)}`, 20, 180);


    pdf.save('invoice-byrahulmali.pdf');
  };

  return (
    <>
      <div className="App">

        <h1>Invoice Pdf Generator</h1>
        <BillDetails onAddItem={handleAddItem} />
        <ItemList items={items}
          onDeleteItem={handleDeleteItem} />
        <TotalAmount
          total={calculateTotalAmount()} />
        <button
          onClick={handleDownloadPDF}>Download PDF</button>



      </div>
      <div className="heading">Made-by Rahul Mali</div>
    </>
  );
}

export default App;