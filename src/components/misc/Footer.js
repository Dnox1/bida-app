import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        {/* <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow> */}
      </MDBContainer>
      <div className="footer-copyright text-center light-green accent-3 py-3">
        <MDBContainer fluid>
        <MDBRow>
          <MDBCol md="6">
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.davidnogueira.com"> David  Nogueira</a>
          </MDBCol>
        </MDBRow>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;