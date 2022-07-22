import React,{useEffect} from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems, setFiches } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import "./datatables.scss"
import MainService from "services/main.service";
import AddUserModal from "./AddFicheModal";
import Moment from "react-moment";

const roles = [
  { id: 1, key: 'Administrateur', value: 'ADMIN' },
  { id: 2, key: 'Manager', value: 'MANAGER' },
  { id: 3, key: 'Employé', value: 'EMPLOYEE' },
  { id: 4, key: 'Gestionnaire RH', value: 'RH_GEST' },
]



const FichesTable = (props) => {
  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Data Tables", link: "#" },
  ]

  const dispatch = useDispatch();

  useEffect(() => {
    props.setBreadcrumbItems('Data Tables', breadcrumbItems)
  })
  
  //const [users, setUsersData] = React.useState([]);

  const fichesData = useSelector(state => state.Fiches.fiches);

  const [filteredRole, setFilteredRole] = React.useState(null);

  const fetchData = () => {
    MainService.getDetailsList()
      .then(res => {
        console.log(res.data)
        dispatch(setFiches(res.data))
        //setFiches(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }



  useEffect(() => {
    if (fichesData.length === 0) {
      fetchData()
    }
  }, [])

  const data = {
    columns: [
      {
        label: "Employé",
        field: "employee",
        sort: "asc",
        width: 150,
      },
      {
        label: "matricule",
        field: "matricule",
        sort: "asc",
        width: 150,
      },
      {
        label: "fonction",
        field: "fonction",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date d'embauche",
        field: "dateEmbauche",
        sort: "asc",
        width: 150,
      },
      {
        label: "Ancienneté",
        field: "anciennete",
        sort: "asc",
        width: 150,
      },
      {
        label: "Intervalle",
        field: "intervale",
        sort: "asc",
        width: 150,
      },
      {
        label: "Département",
        field: "departement",
        sort: "asc",
        width: 150,
      },
      {
        label: "Périodicité prime",
        field: "periodicitePrime",
        sort: "asc",
        width: 150,
      },
      {
        label: "Intitulé service",
        field: "intituleService",
        sort: "asc",
        width: 150,
      },
      {
        label: "Statut",
        field: "statut",
        sort: "asc",
        width: 150,
      },
      {
        label: "Répartition poste",
        field: "repartitionPoste",
        sort: "asc",
        width: 150,
      },
    ],
    rows: 
    fichesData.map(fiche => {
        return {
            employee: fiche.user.firstName + " " + fiche.user.lastName,
            matricule: fiche.user.matricule,
            fonction: fiche.fonction,
            dateEmbauche: <Moment format="YYYY/MM/DD">{fiche.dateEmbauche}</Moment>,
            anciennete: fiche.anciennete,
            intervale: fiche.intervalle,
            departement: fiche.departement,
            periodicitePrime: fiche.periodicitePrime,
            intituleService: fiche.intituleService,
            statut: fiche.statut,
            repartitionPoste: fiche.repartitionPoste
            
        }
      }
      ) 
      
    
  }

  return (
    <React.Fragment>
      
        <MetaTags>
          <title>Utilisateurs</title>
        </MetaTags>

        

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                 <div className="d-flex justify-content-between align-items-center mb-2">
                 <CardTitle className="h4 ">Liste des fiches </CardTitle>
                  <AddUserModal />
                 </div>
                 <div className="mb-4 d-flex align-items-center">
                  Filtrer par role
                  <select
                            className="form-control w-25 ms-2"
                            id="role"
                            name="role"
                            value={filteredRole}
                            onChange={(e) => setFilteredRole(e.target.value)}
                          >
                            <option value="">Sélectionner un role</option>
                            {roles.map(role => (
                              <option key={role.id} value={role.value}>
                                {role.key}
                              </option>
                            ))}
                          </select>
                 </div>
                  

                  <MDBDataTable responsive striped bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(FichesTable);