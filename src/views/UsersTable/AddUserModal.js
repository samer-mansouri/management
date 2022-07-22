import React from 'react'
import { Col, Modal } from 'reactstrap'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MainService from 'services/main.service';
import { appendUser } from 'store/actions';
import { useDispatch } from 'react-redux';

const AddUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Ce champ est obligatoire'),
  lastName: Yup.string()
    .required('Ce champ est obligatoire'),
  email: Yup.string()
    .email('Adresse email invalide')
    .required('Ce champ est obligatoire'),
  matricule: Yup.string()
    .required('Ce champ est obligatoire'),
  role: Yup.string()
    .required('Ce champ est obligatoire'),
  password: Yup.string()
    .required('Ce champ est obligatoire')
});

const roles = [
  { id: 1, key: 'Administrateur', value: 'ADMIN' },
  { id: 2, key: 'Manager', value: 'MANAGER' },
  { id: 3, key: 'Employé', value: 'EMPLOYEE' },
  { id: 4, key: 'Gestionnaire RH', value: 'RH_GEST' },
]

function AddUserModal() {
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen(!open);
    const dispatch = useDispatch();

    const sendData = (values) => {
        MainService.addUser(values)
            .then(res => {
                console.log(res)
                dispatch(appendUser(res.data.user))
                toggleOpen()
            })
            .catch(err => {
                console.log(err)
            })
    }



    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            matricule: '',
            role: '',
            password: '',
        },
        validationSchema: AddUserSchema,
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
                      Ajouter un utilisateur
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
                      <h5 className="modal-title mt-0">Ajouter un utilisateur</h5>
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
                          <label htmlFor="firstName" className="mb-0">Nom</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            placeholder="Saisir le nom"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="text-danger">
                              {formik.errors.firstName}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group mb-2">
                          <label htmlFor="lastName" className="mb-0">Prénom</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            placeholder="Saisir le prénom"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="text-danger">
                              {formik.errors.lastName}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group mb-2">
                          <label htmlFor="email" className="mb-0">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Saisir l'adresse email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group mb-2">
                          <label htmlFor="matricule" className="mb-0">Matricule</label>
                          <input
                            type="text"
                            className="form-control"
                            id="matricule"
                            name="matricule"
                            placeholder="Saisir la matricule"
                            value={formik.values.matricule}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.matricule && formik.errors.matricule ? (
                            <div className="text-danger">
                              {formik.errors.matricule}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group mb-2">
                          <label htmlFor="password" className="mb-0">Mot de passe</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Saisir le mot de passe"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.password && formik.errors.password ? (
                            <div className="text-danger">
                              {formik.errors.password}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="role" className="mb-0">Role</label>
                          <select
                            className="form-control"
                            id="role"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Sélectionner un role</option>
                            {roles.map(role => (
                              <option key={role.id} value={role.value}>
                                {role.key}
                              </option>
                            ))}
                          </select>
                          {formik.touched.role && formik.errors.role ? (
                            <div className="text-danger">
                              {formik.errors.role}
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

export default AddUserModal