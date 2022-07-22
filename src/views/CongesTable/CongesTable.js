import React,{useEffect} from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems, setConges } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import "./datatables.scss"
import MainService from "services/main.service";
import AddCongesModal from "./AddCongesModal";
import Moment from 'react-moment';




const CongesTable = (props) => {
  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Tables", link: "#" },
    { title: "Data Tables", link: "#" },
  ]

  const dispatch = useDispatch();

  useEffect(() => {
    props.setBreadcrumbItems('Data Tables', breadcrumbItems)
  })
  


  const congesData = useSelector(state => state.Conges.conges);

  const fetchData = () => {
    MainService.getCongesList()
      .then(res => {
        console.log(res.data)
        dispatch(setConges(res.data.conges))

      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (congesData.length === 0) {
      fetchData()
    }
  }, [])

  const data = {
    columns: [
      {
        label: "Employé",
        field: "user",
        sort: "asc",
        width: 150
      },
      {
        label: "Matricule de l'employé",
        field: "matricule",
        sort: "asc",
        width: 150
      },
      {
        label: "Titre",
        field: "titre",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date début",
        field: "date_debut",
        sort: "asc",
        width: 270,
      },
      {
        label: "Date fin",
        field: "date_fin",
        sort: "asc",
        width: 200,
      }
    ],
    rows: 
    congesData.map(con => {
        return {
            user: con.user.firstName + " " + con.user.lastName,
            matricule: con.user.matricule,
            titre: con.titre,
            date_debut: <Moment format="YYYY/MM/DD">{con.dateDebut}</Moment>,
            date_fin: <Moment format="YYYY/MM/DD">{con.dateFin}</Moment>,
        }
      }
      )
    
  }

  return (
    <React.Fragment>
      
        <MetaTags>
          <title>Congès</title>
        </MetaTags>

        

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                 <div className="d-flex justify-content-between align-items-center mb-4">
                 <CardTitle className="h4 mb-4">Liste des congés </CardTitle>
                  <AddCongesModal />
                 </div>
                  

                  <MDBDataTable responsive striped bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(CongesTable);
