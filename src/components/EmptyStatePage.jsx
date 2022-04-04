import { React, useState } from "react";
import { Heading, Page, Button, Card, Layout, Link, TextStyle, IndexTable, useIndexResourceState, Stack, Modal, TextContainer } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import ReactDOM from "react-dom";

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

var ordersFulfulled = 121;
var donationTally = 242;
var lastMonthDonations = 536;
var perOrderDonations = 2;
var yearToDateDonations = 1789;
var allTimeDonations = 5324;

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

var month1 = Object.create(pastMonth);
var month2 = Object.create(pastMonth);
var month3 = Object.create(pastMonth);


// TODO set previous months based off todays date
// TODO pull "isPaid" and "paidDate" information from database
function setPastMonths() {
  month1.month = "January";
  month1.year = "2022";
  month1.isPaid = false;
  month2.month = "December";
  month2.year = "2021";
  month2.isPaid = true;
  month2.paidDate = "January 13, 2022";
  month3.month = "November";
  month3.year = "2021";
  month3.isPaid = true;
  month3.paidDate = "December 6, 2022";
};


setPastMonths();


export function EmptyStatePage({ setSelection }) {
  const [open, setOpen] = useState(false);
  const [openViewMore, setOpenViewMore] = useState(false);
  const handleSelection = (resources) => {
    setOpen(false);
    setSelection(resources.selection.map((product) => product.id));
  };

  const months = [
    {
      id: '3411',
      url: 'months/341',
      year: '2022',
      month: 'January',
      orders: 20,
      status: 'Not Paid',
    },
    {
      id: '2561',
      url: 'months/256',
      year: '2021',
      month: 'December',
      orders: 30,
      status: 'Paid',
    },
    {
      id: '1341',
      url: 'months/134',
      year: '2021',
      month: 'November',
      orders: 35,
      status: 'Paid',
    },
  ];
  const resourceName = {
    singular: 'month',
    plural: 'months',
  };
  
  const {selectedResources, allResourcesSelected, handleSelectionChange} =
  useIndexResourceState(months);
  
  const rowMarkup = months.map(
    ({id, year, month, orders, status}, index) => (
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
          content: "Select A fridge",
          onAction: () => setOpen(true),
        }}
      />
      <ResourcePicker // Resource picker component
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setOpen(false)}
      />
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
            <div style={{ float: "right", marginTop: -18, paddingRight: 5, textDecoration: "none" }}>
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

            <Modal // Resource picker component
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
                    selectable = {false}
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

            <Card.Section title={month1.getMonth()}>
              <p style={{ fontSize: 10, display: "inline" }}>{month1.getPaidDate()}</p>
              {
                month1.isPaid ?
                  <button disabled style={{
                    display: "inline", padding: "4px 9px 4px 9px", float: "right", fontSize: 12, fontWeight: "bold", color: "#b0afb4",
                    backgroundColor: "#f1f1f1", borderRadius: 5, border: "none"
                  }}>Paid</button>
                  :
                  <button style={{
                    display: "inline", padding: "4px 9px 4px 9px", float: "right", fontSize: 12, color: "white", backgroundColor: "#028668",
                    borderRadius: 5, border: "none"
                  }}>Mark as Paid</button>
              }

            </Card.Section>

            <Card.Section title={month2.getMonth()}>
              <p style={{ fontSize: 10, display: "inline" }}>{month2.getPaidDate()}</p>
              {
                month2.isPaid ?
                  <button disabled style={{
                    display: "inline", padding: "4px 9px 4px 9px", float: "right", fontSize: 12, fontWeight: "bold", color: "#b0afb4",
                    backgroundColor: "#f1f1f1", borderRadius: 5, border: "none"
                  }}>Paid</button>
                  :
                  <button style={{
                    display: "inline", padding: "4px 9px 4px 9px", float: "right", fontSize: 12, color: "white", backgroundColor: "#028668",
                    borderRadius: 5, border: "none"
                  }}>Mark as Paid</button>
              }
            </Card.Section>

            <Card.Section title={month3.getMonth()}>
              <p style={{ fontSize: 10, display: "inline" }}>{month3.getPaidDate()}</p>
              {
                month3.isPaid ?
                  <button disabled style={{
                    display: "inline", padding: "4px 9px 4px 9px", float: "right", fontSize: 12, fontWeight: "bold", color: "#b0afb4",
                    backgroundColor: "#f1f1f1", borderRadius: 5, border: "none"
                  }}>Paid</button>
                  :
                  <button style={{
                    display: "inline", padding: "4px 9px 4px 9px", float: "right", fontSize: 12, color: "white", backgroundColor: "#028668",
                    borderRadius: 5, border: "none"
                  }}>Mark as Paid</button>
              }
            </Card.Section>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card title="Your Do Good Details" >
            <p style={{ fontSize: 10, marginLeft: 20, color: "gray" }}>Here's the impact you're having with your contributions!</p>
            <table style={{ width: "100%", padding: 15, textAlign: "left" }}>
              <th>Per Order Donation</th>
              <th>Year to Date Donations</th>
              <th>All Time Donations</th>

              <tr>
                <td style={{ fontSize: 20 }}>${perOrderDonations}.00</td>
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
