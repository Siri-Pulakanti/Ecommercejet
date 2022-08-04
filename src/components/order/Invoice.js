import React from "react";
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
export const handlePdfDownlod = (e) => {
  htmlToImage
    .toPng(document.getElementById("newspaper"), { quality: 1.0 })
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Invoice.pdf");
    })
    .then(() => toast.success(`Invoice downloaded`));
};
const Invoice = ({ product }) => {
  return (
    <div>
      <div className="my-5 mx-1" id="newspaper">
        <center style={{ fontSize: "20px" }}>
          {" "}
          {new Date().toLocaleString()}
        </center>
        <h1 style={{ fontSize: "50px" }} className="mb-0 mt-2">
          Order Invoice
        </h1>
        <p style={{ fontSize: "25px" }} className="m-0">
          React Redux Ecommerce
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div className="text-left">
          <h3 style={{ fontSize: "40px" }}>Order Summary</h3>
          <table className="table table-bordered">
            {console.log(product)}
            <thead className="thead-light">
              <tr style={{ fontSize: "25px" }}>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
              </tr>
            </thead>

            <tbody>
              {product.products.map((p, i) => (
                <tr key={i} style={{ fontSize: "30px" }}>
                  <td>
                    <b>{p.product.title}</b>
                  </td>
                  {/* <td>₹{p.product.price}</td> */}
                  <td>
                    {" "}
                    {p.product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td>{p.count}</td>
                  <td>{p.product.brand}</td>
                  <td>{p.color}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />

          <span className="mb-4 ">
            <table
              style={{
                minWidth: "50%",
                marginBottom: "100px",
                fontSize: "25px",
              }}
            >
              <tr>
                <td>
                  <b>Date: </b>
                </td>
                <td>
                  <b>
                    {new Date(
                      product.paymentIntent.created * 1000
                    ).toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <b> Order Id: </b>
                </td>{" "}
                <td>
                  {" "}
                  <b>{product.paymentIntent.id}</b>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <b> Order Status: </b>
                </td>{" "}
                <td>
                  {" "}
                  <b>{product.orderStatus}</b>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <b> Total Paid: </b>
                </td>{" "}
                <td>
                  {" "}
                  <b>
                    {" "}
                    {product.paymentIntent.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </b>
                </td>
              </tr>
            </table>
            <h5 className="text-center" style={{ fontSize: "30px" }}>
              ~ Thank you for shopping with us ~
            </h5>{" "}
            <br />
            <br /> <br />
            <br /> <br />
            <br />
          </span>
        </div>
      </div>
      {/* <button onClick={handlePdfDownlod}>click</button> */}
    </div>
  );
};

export default Invoice;
