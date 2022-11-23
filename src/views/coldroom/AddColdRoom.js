import React, { useState, useCallback, useEffect } from "react";
import SaveButton from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import NotificationModal from "../../components/Modal";
import Form from "react-bootstrap/Form";
import MapBox from "./MapBox";
import apiClient from "../../url";
import validate from "./validate";
import { useDispatch } from "react-redux";
import { coldRoomAction } from "../../store/slices/coldroomSlice";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import classes from "./AddColdRoom.module.css";
const AddColdRoom = (props) => {
  const [coldroomData, setColdroomData] = useState({
    name: "",
    region: "",
    zone: "",
    woreda: "",
    kebele: "",
    price: "",
    latitude: "",
    longitude: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const[modalData,setModalData] = useState({show:false,status:null,title:'',message:''})
  const { data } = props;
  useEffect(() => {
    const coldRoom = {
      name: props.data?.name,
      region: props.data.address?.region,
      zone: props.data.address?.zone,
      woreda: props.data.address?.woreda,
      kebele: props.data.address?.kebele,
      price: props.data.rent?.price,
      latitude: props.data?.latitude,
      longitude: props.data?.longitude,
    };
    setColdroomData(coldRoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setColdroomData((previousStates) => {
      return { ...previousStates, [name]: value };
    });
    setErrors((previousErrors) => {
      return { ...previousErrors, [name]: "" };
    });
  };
  const { latitude, longitude } = coldroomData;
  const getCoordinates = useCallback(
    (cords) => {
      setColdroomData((previousStates) => {
        return { ...previousStates, latitude: cords.lat, longitude: cords.lng };
      });
      setErrors((previousErrors) => {
        return { ...previousErrors, latitude: "" };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [latitude, longitude]
  );

  const createColdRoom = async () => {
    const errorValues = setErrors(validate(coldroomData));
    if (!errorValues) {
      dispatch(buttonAction.setBtnSpiner(true));
      try {
        let response = await apiClient.post("admin/coldRooms", coldroomData);
        if (response.status === 200) {
          const responsData = {
            ...response.data.coldRoom,
            address: response.data.address,
            rent: response.data.rent,
            employee: response.data.employee,
          };
          dispatch(coldRoomAction.addColdRoom(responsData));
          setColdroomData({});
          handleClose();
          setModalData({show:true,status:1,title:'Successful',message:'You created cold room successfully'})
        }
      } catch (err) {
        setModalData({show:true,status:0,title:'Faild',message:'faild to create cold room'})
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
  };
  const editColdRoom = async () => {
    const errorValues = setErrors(validate(coldroomData));
    if (!errorValues) {
      dispatch(buttonAction.setBtnSpiner(true));
      try {
        let response = await apiClient.put(`admin/coldRooms/${props.data.id}`,coldroomData);
        if (response.status === 200) {
          dispatch(coldRoomAction.addColdRoom(response.data));
          handleClose();
          setModalData({show:true,status:1,title:'Successful',message:'You edited cold room successfully'})
        }
      } catch (err) {
        setModalData({show:true,status:0,title:'Faild',message:'faild to edit cold room'})
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
        
        
      }
    }
  };
  const handleModalClose =() =>{
    setModalData({})
  }
  const handleClose = () => {
    props.closeModal(false);
    setErrors({});
    setColdroomData({});
  };
  return (
    <>
      <Modal
        size={"lg"}
        show={props.isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-5">
            <Form.Group className="mb-3" controlId="coldroomName">
              <Form.Label>Cold Room Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={coldroomData.name || ''}
                onChange={changeHandler}
                className={errors.name ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.name}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="coldroomRegion">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                name="region"
                value={coldroomData.region || ''}
                onChange={changeHandler}
                className={errors.region ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.region}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="coldroomZone">
              <Form.Label>Zone</Form.Label>
              <Form.Control
                text="text"
                name="zone"
                value={coldroomData.zone || ''}
                onChange={changeHandler}
                className={errors.zone ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.zone}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="coldroomWoreda">
              <Form.Label>Woreda</Form.Label>
              <Form.Control
                text="text"
                name="woreda"
                value={coldroomData.woreda || ''}
                onChange={changeHandler}
                className={errors.woreda ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.woreda}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="coldroomKebele">
              <Form.Label>Kebele</Form.Label>
              <Form.Control
                text="text"
                name="kebele"
                value={coldroomData.kebele || ''}
                onChange={changeHandler}
                className={errors.kebele ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.kebele}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="coldroomFee">
              <Form.Label>Rent fee per KG</Form.Label>
              <Form.Control
                text="number"
                name="price"
                value={coldroomData.price || ''}
                onChange={changeHandler}
                className={errors.price ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.price}</span>
            </Form.Group>

            <div className="my-3">Choose location of cold room on map</div>
            {coldroomData.latitude && (
              <div>
                <div>Latitude: {coldroomData.latitude}</div>
                <div>Longitude: {coldroomData.longitude}</div>
              </div>
            )}
            <div>
              <MapBox onMapClick={getCoordinates} />
              <div
                className={`${errors.latitude ? classes.errorText : ""} my-3`}
              >
                {errors.latitude}
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
          {props.title.isEdit ? (
            <SaveButton title={"Save Edited Cold Room"} onSave={editColdRoom} />
          ) : (
            <SaveButton title={"Save Cold Room"} onSave={createColdRoom} />
          )}
        </Modal.Footer>
      </Modal>
      <NotificationModal modal={modalData} onClose={handleModalClose} />
    </>
  );
};

export default React.memo(AddColdRoom);
