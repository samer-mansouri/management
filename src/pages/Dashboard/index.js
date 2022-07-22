import React , {useEffect} from "react"
import MetaTags from 'react-meta-tags';
import { connect } from "react-redux";
import {
  Row,
  Col,
} from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings";
import EmailSent from "./email-sent";
import MonthlyEarnings2 from "./montly-earnings2";
import Inbox from "./inbox";
import RecentActivity from "./recent-activity";
import WidgetUser from "./widget-user";
import YearlySales from "./yearly-sales";
import LatestTransactions from "./latest-transactions";
import LatestOrders from "./latest-orders";
import MainService from '../../services/main.service';
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

const Dashboard = (props) => {

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Dashboard", link: "#" }
  ]


  const [stats, setStats] = React.useState([]);

  const fetchData = () => {

    MainService.getStatics()
    .then(res => {
      console.log(res.data);
      setStats(res.data);
    }).catch(err => {
      console.log(err);
    })

  }

  useEffect(() => {
    props.setBreadcrumbItems('Dashboard' , breadcrumbItems)
  }, [])

  useEffect(() => {
    fetchData();
  }, [])

  const reports = [
    { title: "Nombre d'utilisateurs", iconClass: "account-group", total: stats?.userCount},
    { title: "Congès", iconClass: "buffer", total: stats?.congesCount },
    { title: "Nombre de fiches", iconClass: "file-edit", total: stats?.fichesCount},
    /*    { title: "Product Sold", iconClass: "briefcase-check", total: "1890", average: "+89%", badgecolor: "info" },
*/
  ]

  return (
    <React.Fragment>

      <MetaTags>
        <title>Dashboard | Lexa - Responsive Bootstrap 5 Admin Dashboard</title>
      </MetaTags>

      {/*mimi widgets */}
      <Miniwidget reports={reports} />

      <Row>
        <Col xl="3">
          {/* Monthly Earnings */}
          <MonthlyEarnings />
        </Col>

        <Col xl="6">
          {/* Email sent */}
          <EmailSent />
        </Col>

        <Col xl="3">
          <MonthlyEarnings2 />
        </Col>

      </Row>
     {
      /*
 <Row>

        <Col xl="4" lg="6">
          inbox 
          <Inbox />
        </Col>
        <Col xl="4" lg="6">
           recent activity 
          <RecentActivity />

        </Col>
        <Col xl="4"
           widget user 
          <WidgetUser />

          yearly sales 
          <YearlySales />
        </Col>
      </Row>
      */
     }

      {
        /*
        <Row>
        <Col xl="6">
           latest transactions 
          <LatestTransactions />
        </Col>

        <Col xl="6">
          latest orders 
          <LatestOrders />
        </Col>
      </Row>
        */
      }

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard);