import React from 'react'
import { Col, Modal } from 'reactstrap'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MainService from 'services/main.service';
import { appendConge } from 'store/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const AddCongesSchema = Yup.object().shape({
  titre: Yup.string()
    .required('Ce champ est requis'),
  dateDebut: Yup.string()
    .test('dateDebut_sup_a_current_date', 'La date de début doit être après la date actuelle', function (value) {
      if (value) {
        return new Date(value) > new Date()
      }
      return true
    })
    .required('Ce champ est requis'),
  dateFin: Yup.string()
    //Compare if dateFin is after dateDebut
    .test('dateFin_sup_a_current_date', 'La date de fin doit être après la date actuelle', function (value) {
      if (value) {
        return new Date(value) > new Date()
      }
      return true
    })
    .test('dateFin_after_dateDebut', 'La date de fin doit être après la date de début', function (value) {
      if (this.parent.dateDebut) {
        return new Date(value) > new Date(this.parent.dateDebut);
      }
      return true;
    })
    .required('Ce champ est requis'),
  userId: Yup.string()
    .required('Ce champ est requis'),
});





function AddCongesModal() {
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen(!open);

    const dispatch = useDispatch();

    const users = useSelector(state => state.Users.users);

    const sendData = (values) => {
        let formData = new FormData();
        formData.append("dateDebut", values.dateDebut);
        formData.append("dateFin", values.dateFin);
        formData.append("titre", values.titre);
        formData.append("userId", values.userId);
        MainService.addConges(formData)
            .then(res => {
                console.log(res)
                dispatch(appendConge(res.data.conges))
                toggleOpen()
            })
            .catch(err => {
                console.log(err)
            })
    }



    const formik = useFormik({
        initialValues: {
            titre: '',
            dateDebut: '',
            dateFin: '',
            userId: '',
        },
        validationSchema: AddCongesSchema,
        onSubmit: values => {
            console.log(values);
            sendData(values)
            //toggleOpen();
        }
    });
  return (
    <Col sm={6} md={3} className="mt-4">
                  <div className="text-center">
                    
                    <button
                      type="button"
                      className="btn btn-primary waves-effect waves-light"
                      onClick={() => {
                        toggleOpen();
                      }}
                      data-toggle="modal"
                      data-target=".bs-example-modal-center"
                    >
                      Ajouter un congès
                </button>
                  </div>
                  

                  <Modal
                    isOpen={open}
                    toggle={() => {
                        toggleOpen()
                    }}
                    centered={true}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title mt-0">Ajouter un congès</h5>
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="form-group mb-2">
                          <label htmlFor="titre" className="mb-0">Titre</label>
                          <input
                            type="text"
                            className="form-control"
                            id="titre"
                            name="titre"
                            placeholder="Titre"
                            value={formik.values.titre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.titre && formik.errors.titre ? (
                            <div className="text-danger">
                              {formik.errors.titre}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="dateDebut" className="mb-0">Date début</label>
                          <input
                            type="date"
                            className="form-control"
                            id="dateDebut"
                            name="dateDebut"
                            placeholder="Date début"
                            value={formik.values.dateDebut}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.dateDebut && formik.errors.dateDebut ? (
                            <div className="text-danger">
                              {formik.errors.dateDebut}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group mb-2">
                          <label htmlFor="dateFin" className="mb-0">Date fin</label>
                          <input
                            type="date"
                            className="form-control"
                            id="dateFin"
                            name="dateFin"
                            placeholder="Date fin"
                            value={formik.values.dateFin}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.dateFin && formik.errors.dateFin ? (
                            <div className="text-danger">
                              {formik.errors.dateFin}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="userId" className="mb-0">Utilisateur</label>
                          <select
                            className="form-control"
                            id="userId"
                            name="userId"
                            value={formik.values.userId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Choisir un utilisateur</option>
                            {users.map(user => (
                              <option key={user.id} value={user.id}>
                                {user.firstName} {user.lastName}
                              </option>
                            ))}
                          </select>
                          {formik.touched.userId && formik.errors.userId ? (
                            <div className="text-danger">
                              {formik.errors.userId}
                            </div>
                          ) : null}
                        </div>
                        




                       

                        <div className="form-group mt-3 d-flex justify-content-end">
                        <button
                            type="button"
                            onClick={() => {
                              setOpen(false);
                            }}
                            className="btn btn-secondary waves-effect me-1"
                          >
                            Fermer
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary waves-effect waves-light"
                          >
                            Envoyer
                          </button>

                         
                        </div>
                      </form>
                      


                      
                    </div>
                  </Modal>
                  
                </Col>
  )
}

export default AddCongesModal