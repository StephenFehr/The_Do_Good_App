import { React, useState, useCallback } from "react";
import { Page, Button, Card, Layout, TextStyle, IndexTable, useIndexResourceState, Modal, TextField } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { GetMonthInformation } from "./SearchDataBase.jsx";
import { FirstOfMonth, LastOfMonth } from "./GetMonthDate.jsx";
import { GetOrders } from "./GetOrders.jsx";

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

{/* WE may need to change the name of this file away from EmptyStatePage. We will
  also need to modify app.jsx in order to handle this */}


var ordersFulfulled = 5;
var donationTally = 0;
var lastMonthDonations = 0;
var yearToDateDonations = 0;
var allTimeDonations = 0;

var pastMonth = {
  month: "",
  year: "",
  isPaid: false,
  paidDate: "none",

  getMonth: function () {
    return this.month + " " + this.year;
  },

  getPaidDate: function () {
    if (!this.isPaid) { return "You have not yet donated for " + this.month; }
    else { return "You marked as Paid on " + this.paidDate; }
  }
};


var month2 = Object.create(pastMonth);
var month3 = Object.create(pastMonth);


// TODO set previous months based off todays date
// TODO pull "isPaid" and "paidDate" information from database
function setPastMonths() {

};


setPastMonths();

export function EmptyStatePage({ setSelection }) {
  const [open, setOpen] = useState(false);
  const [openViewMore, setOpenViewMore] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [perOrderDonations, setPerOrderDonations] = useState("1.00");


{/**** DUPLICATE CODE - LINE 58 - 106 ******/}

  const [month1, setMonth1] = useState({
    mot: "March",
    year: "2022",
    isPaid: false,
    paidDate: "April 5th 2022",

    getMonth: function () {
      return this.mot + " " + this.year;
    },

    getPaidDate: function () {
      if (!this.isPaid) { return "You have not yet donated for " + this.month; }
      else { return "You marked as Paid on " + this.paidDate; }
    }
  });

  const [month2, setMonth2] = useState({
    month: "February",
    year: "2022",
    isPaid: false,
    paidDate: "April 5th 2022",

    getMonth: function () {
      return this.month + " " + this.year;
    },

    getPaidDate: function () {
      if (!this.isPaid) { return "You have not yet donated for " + this.month; }
      else { return "You marked as Paid on " + this.paidDate; }
    }
  });

  const [month3, setMonth3] = useState({
    month: "January",
    year: "2022",
    isPaid: false,
    paidDate: "April 5th 2022",

    getMonth: function () {
      return this.month + " " + this.year;
    },

    getPaidDate: function () {
      if (!this.isPaid) { return "You have not yet donated for " + this.month; }
      else { return "You marked as Paid on " + this.paidDate; }
    }
  });

  const handleDonationChange = useCallback((newValue) => setPerOrderDonations(newValue), [])

  const months = [ //fetches the last three months. can you GetMonthDate/firstOfMonth(1) for the previous month.
                    //DATA USED IN THE VIEW MORE BUTTON
    {

      id: '3411',
      url: 'months/341',
      year: GetMonthInformation(FirstOfMonth(0)).year,
      month:  GetMonthInformation(FirstOfMonth(0)).month,
      orders: GetOrders(FirstOfMonth(0), LastOfMonth(-1)),
      status: 'Not Paid',
      
    },
    {
      id: '2561',
      url: 'months/256',
      year: GetMonthInformation(FirstOfMonth(1)).year,
      month: GetMonthInformation(FirstOfMonth(1)).month,
      orders: GetOrders(FirstOfMonth(1), LastOfMonth(0)),
      status: 'Not Paid',
    },
    {
      id: '1341',
      url: 'months/134',
      year: GetMonthInformation(FirstOfMonth(2)).year,
      month: GetMonthInformation(FirstOfMonth(2)).month,
      orders: 35,
      status: 'Not Paid',
    },
  ];

  const resourceName = {
    singular: 'month',
    plural: 'months',
  };

  const { selectedResources, allResourcesSelected } =
    useIndexResourceState(months);

  const rowMarkup = months.map( //we will need a DB search function here?
    ({ id, year, month, orders, status }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <TextStyle variation="strong">{year}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{month}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Page>
      <TitleBar
        primaryAction={{
          content: "Settings",
          onAction: () => setOpenSettings(true),
        }}
      />
      <Modal // Settings component
        open={openSettings}
        onClose={() => setOpenSettings(false)}
        title="Settings"
      >
        <Modal.Section>
          <Card>
            <TextField
              type="number"
              max = {50}
              min = {0}
              label="Donation Value per Order"
              value={ perOrderDonations <= 0 ? 0 : perOrderDonations }
              onChange={handleDonationChange}
              autoComplete="off"
  
            />
          </Card>
        </Modal.Section>
      </Modal>
      <Layout>
        <Layout.Section oneThird>
          <Card title="Month to Date">
            <Card.Section>
              <p style={{ fontWeight: "bold" }}>Orders Fulfilled</p>
              <p style={{ fontSize: 20 }}>{ordersFulfulled}</p>
            </Card.Section>

            <Card.Section>
              <p style={{ fontWeight: "bold" }}>Donation Tally</p>
              <p style={{ fontSize: 20 }}>${donationTally}</p>
            </Card.Section>

            <Card.Section>
              <p style={{ fontWeight: "bold" }}>Last Month Donations</p>
              <p style={{ fontSize: 20 }}>${lastMonthDonations}</p>
            </Card.Section>
          </Card>
        </Layout.Section>



        <Layout.Section oneThird>
          <Card title="Past Months">
            <div style={{ float: "right", marginTop: -18, paddingRight: 20, textDecoration: "none" }}>
              <Button

                float={"right"}
                primary
                textAlign={"center"}
                onClick={() => {
                  setOpenViewMore(true)
                }}
              >
                View More
              </Button>
            </div>

            <Modal // View More component
              open={openViewMore}
              onClose={() => setOpenViewMore(false)}
              title="Past Months"
            >
              <Modal.Section>
                <Card>
                  <IndexTable
                    resourceName={resourceName}
                    itemCount={months.length}
                    selectedItemsCount={
                      allResourcesSelected ? 'All' : selectedResources.length
                    }
                    selectable={false}
                    headings={[
                      { title: 'Year' },
                      { title: 'Month' },
                      { title: 'Order Count' },
                      { title: 'Status' }
                    ]}
                  >
                    {rowMarkup}
                  </IndexTable>
                </Card>
              </Modal.Section>
            </Modal>

          {/*********** CODE DUPLICATION**********/}
          {/*********** LINE 265 - 398 ***********/}

            <Card.Section title={month1.getMonth()}>
              <p style={{ fontSize: 10, display: "inline" }}>{month1.getPaidDate()}</p>
              <div style={{ float: "right", marginTop: -18, paddingRight: 0, textDecoration: "none" }}>
                {
                  month1.isPaid ?

                    <Button
                      disabled={true}
                      float={"right"}
                      primary
                      textAlign={"center"}
                      onClick={() => {
                        //setOpenViewMore(true)
                      }}
                    >

                      Paid
                    </Button>

                    :
                    <Button

                      float={"right"}
                      primary
                      textAlign={"center"}
                      onClick={() => {

                        //do shit in here
                        yearToDateDonations += perOrderDonations * months[0].orders;
                        allTimeDonations += perOrderDonations * months[0].orders;
                        //donationTally += months[0].orders;
                        lastMonthDonations += perOrderDonations * months[0].orders;
                        setMonth1(prevState => ({
                          ...prevState,
                          isPaid: true
                        }));
                      }}
                    >
                      Mark As Paid
                    </Button>
                }
              </div>
            </Card.Section>

            <Card.Section title={month2.getMonth()}>
              <p style={{ fontSize: 10, display: "inline" }}>{month2.getPaidDate()}</p>
              <div style={{ float: "right", marginTop: -18, paddingRight: 0, textDecoration: "none" }}>
                {
                  month2.isPaid ?

                    <Button
                      disabled={true}
                      float={"right"}
                      primary
                      textAlign={"center"}
                      onClick={() => {
                        //setOpenViewMore(true)
                      }}
                    >
                      Paid
                    </Button>

                    :
                    <Button

                      float={"right"}
                      primary
                      textAlign={"center"}
                      onClick={() => {

                        //do shit in here
                        yearToDateDonations += perOrderDonations * months[1].orders;
                        allTimeDonations += perOrderDonations * months[1].orders;
                        //donationTally += months[1].orders;
                        
                        setMonth2(prevState => ({
                          ...prevState,
                          isPaid: true
                        }));
                      }}
                    >
                      Mark As Paid
                    </Button>
                }
              </div>
            </Card.Section>

            <Card.Section title={month3.getMonth()}>
              <p style={{ fontSize: 10, display: "inline" }}>{month3.getPaidDate()}</p>
              <div style={{ float: "right", marginTop: -18, paddingRight: 0, textDecoration: "none" }}>
                {
                  month3.isPaid ?

                    <Button
                      disabled={true}
                      float={"right"}
                      primary
                      textAlign={"center"}
                      onClick={() => {
                        //setOpenViewMore(true)
                      }}
                    >
                      Paid
                    </Button>

                    :
                    <Button

                      float={"right"}
                      primary
                      textAlign={"center"}
                      onClick={() => {

                        //do shit in here
                        yearToDateDonations += perOrderDonations * months[2].orders;
                        allTimeDonations += perOrderDonations * months[2].orders;
                        //donationTally += months[2].orders;
                        setMonth3(prevState => ({
                          ...prevState,
                          isPaid: true
                        }));
                      }}
                    >
                      Mark As Paid
                    </Button>
                }
              </div>
            </Card.Section>
          </Card>
        </Layout.Section>

                {/* MOVE THIS SECTION TO THE TOP OF THE USER PAGE */}
        <Layout.Section oneHalf>
          <Card title="Your Do Good Details" >
            <p style={{ fontSize: 10, marginLeft: 20, color: "gray" }}>Here's the impact you're having with your contributions!</p>
            <table style={{ width: "100%", padding: 15, textAlign: "left" }}>
              <th>Per Order Donation</th>
              <th>Year to Date Donations</th>
              <th>All Time Donations</th>

              <tr>
              
                <td style={{ fontSize: 20 }}>${ perOrderDonations <= 0 ? 0 : perOrderDonations >= 50 ? 50 : perOrderDonations }</td>
                <td style={{ fontSize: 20 }}>${yearToDateDonations}</td>
                <td style={{ fontSize: 20 }}>${allTimeDonations}</td>
              </tr>
            </table>

          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
