import React,{useEffect} from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems, setUsers } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import "./datatables.scss"
import MainService from "services/main.service";
import AddUserModal from "./AddUserModal";

const roles = [
  { id: 1, key: 'Administrateur', value: 'ADMIN' },
  { id: 2, key: 'Manager', value: 'MANAGER' },
  { id: 3, key: 'Employé', value: 'EMPLOYEE' },
  { id: 4, key: 'Gestionnaire RH', value: 'RH_GEST' },
]



const UsersTable = (props) => {
  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Data Tables", link: "#" },
  ]

  const dispatch = useDispatch();

  useEffect(() => {
    props.setBreadcrumbItems('Data Tables', breadcrumbItems)
  })
  
  const [users, setUsersData] = React.useState([]);

  const usersData = useSelector(state => state.Users.users);

  const [filteredRole, setFilteredRole] = React.useState(null);

  const fetchData = () => {
    MainService.getUsersList()
      .then(res => {
        console.log(res.data)
        dispatch(setUsers(res.data))
        setUsersData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }



  useEffect(() => {
    if (usersData.length === 0) {
      fetchData()
    }
  }, [])

  const data = {
    columns: [
      {
        label: "Matricule",
        field: "matricule",
        sort: "asc",
        width: 150,
      },
      {
        label: "Nom",
        field: "firstName",
        sort: "asc",
        width: 270,
      },
      {
        label: "Prénom",
        field: "lastName",
        sort: "asc",
        width: 200,
      },
      {
        label: "email",
        field: "email",
        sort: "asc",
        width: 100,
      },
      {
        label: "role",
        field: "role",
        sort: "asc",
        width: 150,
      },
    ],
    rows: filteredRole ?
    usersData.filter(user => user.role === filteredRole).map(user => {
        return {
          matricule: user.matricule,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        }
      }
      ) : 
    usersData.map(user => {
        return {
          matricule: user.matricule,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
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
                 <CardTitle className="h4 ">Liste des utilisateurs </CardTitle>
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

export default connect(null, { setBreadcrumbItems })(UsersTable);