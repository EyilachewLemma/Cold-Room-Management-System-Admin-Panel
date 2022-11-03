import { Fragment,useState,useCallback } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import ExportBtn from "../../components/ExportBtn";
import Dropdown from 'react-bootstrap/Dropdown';
import Avocado from '../../assetes/avocado.jpg'
import Button from 'react-bootstrap/Button';
import AddProduct from "./AddProduct";
import classes from "./Products.module.css";


const Products = () => {
  const [togleModal,setTogleModal] = useState(false)
  const products = [1,2,3,4,5,6,7,8,9,10,11]
  const handleCloseModal = useCallback((value) =>{
     setTogleModal(value)
  },[])
  return (
    <Fragment>
      <h5 className="text-bold">Product List</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the products section you can review and manage all products with
        their detail.You can view and edit many information such as product
        title, product description, product stock, product SKU, product price
        and product Status. You can also add new product and delete product
      </p>
      <div className={classes.bottomBorder}>
       
      </div>
      <div className="d-flex justify-content-between mt-4">
        <InputGroup className="mb-3 w-50 border rounded">
          <InputGroup.Text id="basic-addon1" className={classes.searchIcon}>
            <span>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <div className="ms-auto me-5">
        <Button className={classes.btn} onClick={()=>{setTogleModal(true)}}>Add Product</Button>
        </div>
        <div>
          <ExportBtn />
        </div>
      </div>
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>NO</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Amount(KG)</th>
              <th className="sr-only">action</th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr key={index}>
              <td className="p-4">1</td>
              <td className="p-4">Avocado</td>
              <td className="p-2">
                <img src={Avocado} alt="Avocado_image" className={`${classes.img} img-fluid`} />
              </td>
              <td className="p-4">1234</td>
              <td className="">
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className={classes.dropdownBg}>
      <Dropdown.Item className="p-0">
      <Button variant="none" className="border-bottom w-100 rounded-0">View Detail</Button>
      </Dropdown.Item>
        <Dropdown.Item className="p-0">
        <Button variant="none" className="border-bottom w-100 rounded-0">Edit</Button>
        </Dropdown.Item>
        <Dropdown.Item className="p-0">
        <Button variant="none" className="w-100 rounded-0">Delete</Button>
        </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      <AddProduct isOpen={togleModal} closeModal={handleCloseModal}></AddProduct>
    </Fragment>
  );
};
export default Products;
