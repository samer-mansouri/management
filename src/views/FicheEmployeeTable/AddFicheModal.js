import React from 'react'
import { Col, Modal } from 'reactstrap'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MainService from 'services/main.service';
import { appendUser } from 'store/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const AddFicheSchema = Yup.object().shape({
  fonction: Yup.string()
      .required('Ce champ est obligatoire'),
  dateEmbauche: Yup.string()
      .required('Ce champ est obligatoire'),
  anciennete: Yup.string()
      .required('Ce champ est obligatoire'),
  intervalle: Yup.string()
      .required('Ce champ est obligatoire'),
  departement: Yup.string()
      .required('Ce champ est obligatoire'),
  periodicitePrime: Yup.string()
      .required('Ce champ est obligatoire'),
  intituleService: Yup.string()
      .required('Ce champ est obligatoire'),
  statut: Yup.string()
      .required('Ce champ est obligatoire'),
  repartitionPoste: Yup.string()
      .required('Ce champ est obligatoire'),
  userId: Yup.string()
      .required('Ce champ est obligatoire'),
  managerId: Yup.string()
      .required('Ce champ est obligatoire'),
});

const roles = [
  { id: 1, key: 'Administrateur', value: 'ADMIN' },
  { id: 2, key: 'Manager', value: 'MANAGER' },
  { id: 3, key: 'Employé', value: 'EMPLOYEE' },
  { id: 4, key: 'Gestionnaire RH', value: 'RH_GEST' },
]

const Periodicite = [
  "Trimestrielle",
  "Menuelle",
  "Annuelle",
  "Semestrielle"
]

const Statut = [
  "Cadre", 
  "AgentDeMaitrise",
]

const RepartitionPoste = [
  "FrontOffice",
  "BackOffice",
  "DSI",
  "AutresServices"
]

function AddFicheModal() {
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen(!open);
    const dispatch = useDispatch();

    const users = useSelector(state => state.Users.users);
    const fiches = useSelector(state => state.Fiches.fiches);

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
            fonction: '',
            dateEmbauche: '',
            anciennete: '',
            intervalle: '',
            departement: '',
            periodicitePrime: '',
            intituleService: '',
            statut: '',
            repartitionPoste: '',
            userId: '',
            managerId: '',
        },
        validationSchema: AddFicheSchema,
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
                      Ajouter une fiche d'employé
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
                      <h5 className="modal-title mt-0">Ajouter une fiche</h5>
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
                    <div className="modal-body ">
                      <form onSubmit={formik.handleSubmit}>

                        <div className="form-group">
                          <label htmlFor="fonction">Fonction</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fonction"
                            name="fonction"
                            placeholder="Fonction"
                            value={formik.values.fonction}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.fonction && formik.errors.fonction ? (
                            <div className="text-danger">
                              {formik.errors.fonction}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="dateEmbauche">Date d'embauche</label>
                          <input
                            type="date"
                            className="form-control"
                            id="dateEmbauche"
                            name="dateEmbauche"
                            placeholder="Date d'embauche"
                            value={formik.values.dateEmbauche}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.dateEmbauche && formik.errors.dateEmbauche ? (
                            <div className="text-danger">
                              {formik.errors.dateEmbauche}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="anciennete">Ancienneté</label>
                          <input
                            type="text"
                            className="form-control"
                            id="anciennete"
                            name="anciennete"
                            placeholder="Ancienneté"
                            value={formik.values.anciennete}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.anciennete && formik.errors.anciennete ? (
                            <div className="text-danger">
                              {formik.errors.anciennete}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="intervalle">Intervalle</label>
                          <input
                            type="text"
                            className="form-control"
                            id="intervalle"
                            name="intervalle"
                            placeholder="Intervalle"
                            value={formik.values.intervalle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.intervalle && formik.errors.intervalle ? (
                            <div className="text-danger">
                              {formik.errors.intervalle}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="departement">Département</label>
                          <input
                            type="text"
                            className="form-control"
                            id="departement"
                            name="departement"
                            placeholder="Département"
                            value={formik.values.departement}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.departement && formik.errors.departement ? (
                            <div className="text-danger">
                              {formik.errors.departement}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="periodicitePrime">
                            Periodicité de la prime
                          </label>
                          <select
                            className="form-control"
                            id="periodicitePrime"
                            name="periodicitePrime"
                            value={formik.values.periodicitePrime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Choisir une périodicité</option>
                            {Periodicite.map((periodicitePrime, index) => (
                              <option key={index} value={periodicitePrime}>
                                {periodicitePrime}
                              </option>
                            ))}
                          </select>
                          {formik.touched.periodicitePrime && formik.errors.periodicitePrime ? (
                            <div className="text-danger">
                              {formik.errors.periodicitePrime}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="intituleService">Intitule service</label>
                          <input
                            type="text"
                            className="form-control"
                            id="intituleService"
                            name="intituleService"
                            placeholder="intituleService"
                            value={formik.values.intituleService}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.intituleService && formik.errors.intituleService ? (
                            <div className="text-danger">
                              {formik.errors.intituleService}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="statut">Statut</label>
                          <select
                            className="form-control"
                            id="statut"
                            name="statut"
                            value={formik.values.statut}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Choisir un statut</option>
                            {Statut.map((statut, index) => (
                              <option key={index} value={statut}>
                                {statut}
                              </option>
                            ))}
                          </select>
                          {formik.touched.statut && formik.errors.statut ? (
                            <div className="text-danger">
                              {formik.errors.statut}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="repartitionPoste">Répartition poste</label>
                          <select
                            className="form-control"
                            id="repartitionPoste"
                            name="repartitionPoste"
                            value={formik.values.repartitionPoste}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Choisir une répartition</option>
                            {RepartitionPoste.map((repartitionPoste, index) => (
                              <option key={index} value={repartitionPoste}>
                                {repartitionPoste}
                              </option>
                            ))}
                          </select>
                          {formik.touched.repartitionPoste && formik.errors.repartitionPoste ? (
                            <div className="text-danger">
                              {formik.errors.repartitionPoste}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="userId">Employé</label>
                          <select
                            className="form-control"
                            id="userId"
                            name="userId"
                            value={formik.values.userId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Choisir un employé</option>
                            {users
                            .filter(user => user.role !== "ADMIN")
                            .filter(user => user.role !== "MANAGER")
                            .map((user, index) => (
                              <option key={index} value={user.id}>
                                {user.firstName} {user.lastName} - {user.matricule}
                              </option>
                            ))}
                          </select>
                          {formik.touched.userId && formik.errors.userId ? (
                            <div className="text-danger">
                              {formik.errors.userId}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="managerId">Manager</label>
                          <select
                            className="form-control"
                            id="managerId"
                            name="managerId"
                            value={formik.values.managerId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Choisir un manager</option>
                            {users
                            .filter(user => user.role === "MANAGER")
                            .map((user, index) => (
                              <option key={index} value={user.id}>
                                {user.firstName} {user.lastName} - {user.matricule}
                              </option>
                            ))}
                          </select>
                          {formik.touched.managerId && formik.errors.managerId ? (
                            <div className="text-danger">
                              {formik.errors.managerId}
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

export default AddFicheModal