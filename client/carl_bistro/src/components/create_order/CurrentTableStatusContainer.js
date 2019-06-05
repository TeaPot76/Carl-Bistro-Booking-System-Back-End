import React, {
    Component
  } from "react";
import CurrentTableTableList from "./CurrentTableTableList";
import Request from '../../helpers/Request';
import { log } from "util";

  class CurrentTableStatus extends Component {
      constructor(props){
          super(props)
          this.state = {
            orderClicked: false,
            occupiedTables: [],
            selectedTable: null,
            selectedBookingUrl: null,
            menu: null,
            items: [0,0,0,0,0,0,0,0,0,0,0,0]
          }
          this.handleClickedTable = this.handleClickedTable.bind(this);
      }

      componentDidMount(){
          const url = `http://localhost:8080/seatingTables`; // all tables
          const request = new Request();
          request.get(url)
          .then((tables)=>{
              this.setState({
                allTables: tables._embedded.seatingTables
              },()=>{
                const url2 = `http://localhost:8080/menuItems`;
                request.get(url2)
                .then((menuItems)=>{
                    this.setState({
                        menu: menuItems._embedded.menuItems,
                        [menuItems._embedded.menuItems[1].name]: "hello"

                    })
                })
              })
          })
      }

      handleChange = event => {
        const index = event.target.name - 1;        
        let newArrayItems = [...this.state.items];        
        newArrayItems[index] = event.target.value;
        this.setState({
            items: newArrayItems
        })       
      }

      handleClickedTable(object){
          this.setState(object,()=>{
            const url = `http://localhost:8080/bookings/today/seatingTable/${this.state.selectedTable}`;
            const request = new Request();
            request.get(url)
            .then((bookings)=>{
                if(bookings.length !== 0){
                    const bookingID = bookings[0].id;
                    this.setState({
                        selectedBookingUrl: `http://localhost:8080/bookings/${bookingID}`
                    })
                }
                
            })
          });
      }

      submitOrders = () => {
        let counter = 0;
        const request = new Request()
          this.state.items.forEach(quantityOfItem => {
              let intQuantity = parseInt(quantityOfItem)
              if (intQuantity != 0 || intQuantity != ''){
                  let itemId = counter + 1;                  
                  let url = `http://localhost:8080/menuItems/${itemId}`;
                  let postObject = {
                      "booking": this.state.selectedBookingUrl,
                      "menuItem": url
                  }                  
                  for (let index = 0; index < intQuantity; index++) {
                      request.post(`http://localhost:8080/orders`,postObject);
                  }
              }
              counter ++;
          });
      }

      _orderClicked = () => {
          if (this.state.orderClicked === false) {
              this.setState({
                  orderClicked: true
              })
          } else {
              this.setState({
                  orderClicked: false
              })
          }
      }

      addOrder(){
        return(
            <button type="button" onClick={this.props.orderButtonClick}>Add Order To Table</button>
        )
      }

      backToTables(){
        return(
            <button type="button" onClick={this._orderClicked}>Back to Table View</button>
        )
      }
    

      render(){
          return(
              <React.Fragment>
                  <CurrentTableTableList
                    orderClicked={this.state.orderClicked}
                    occupiedTables={this.state.allTables} //change back to occupied tables when query successful
                    orderButtonClick={this._orderClicked}
                    handleClickedTable={this.handleClickedTable}
                  />
                  <AddOrder
                    orderClicked={this.state.orderClicked}
                    onSubmit={this.handleSubmit}
                    backToTables={this._orderClicked}
                    selectedBookingUrl={this.state.selectedBookingUrl}
                    menu={this.state.menu}
                    items={this.state.items}
                    handleChange={this.handleChange}
                    submitOrders={this.submitOrders}
                  />
                  
              </React.Fragment>
          )
      }
  }


  function AddOrder(props){
    if (props.orderClicked === false) {
        return null
    }

    // const menuOptions = props.menu.map((menuItem, index) => {
    //     return (
    //         <p><label htmlFor={menuItem.name}>{menuItem.name}: </label><input name={menuItem.name}type="number" value="0" key={index+1}/></p>
    //         // <p><label htmlFor={menuItem.name}>Quantity: </label><input type="number" /></p>
    //     )
    //   })
    return(
        <div>
            <h1>Hello, I am menu item order form</h1>
                <form onSubmit={props.onSubmit}>
                    <label htmlFor="menuItem">Menu</label>
                    <p><label htmlFor="item1">Burger: </label>
                    <input 
                        name="1" 
                        type="number" 
                        value={props.items[0]} 
                        key="1"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item2">Hot Dog: </label>
                    <input 
                        name="2" 
                        type="number" 
                        value={props.items[1]} 
                        key="2"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item3">Stew: </label>
                    <input 
                        name="3" 
                        type="number" 
                        value={props.items[2]} 
                        key="3"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item4">Vegan Burrito: </label>
                    <input 
                        name="4" 
                        type="number" 
                        value={props.items[3]} 
                        key="4"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item5">Greek Salad: </label>
                    <input 
                        name="5" 
                        type="number" 
                        value={props.items[4]} 
                        key="5"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item6">Viennese Schnitzel: </label>
                    <input 
                        name="6" 
                        type="number" 
                        value={props.items[5]} 
                        key="6"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item7">Coke: </label>
                    <input 
                        name="7" 
                        type="number" 
                        value={props.items[6]} 
                        key="7"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item8">Irn Bru: </label>
                    <input 
                        name="8" 
                        type="number" 
                        value={props.items[7]} 
                        key="8"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item9">Lilt: </label>
                    <input 
                        name="9" 
                        type="number" 
                        value={props.items[8]} 
                        key="9"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item10">Red Wine: </label>
                    <input 
                        name="10" 
                        type="number" 
                        value={props.items[9]} 
                        key="10"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item11">Champagne: </label>
                    <input 
                        name="11" 
                        type="number" 
                        value={props.items[10]} 
                        key="11"
                        onChange={props.handleChange}
                    /></p>
                    <p><label htmlFor="item12">Beer: </label>
                    <input 
                        name="12" 
                        type="number" 
                        value={props.items[11]} 
                        key="12"
                        onChange={props.handleChange}
                    /></p>
                    <button type="button" onClick={props.submitOrders}>Create Orders</button>
                </form>
                <button type="button" onClick={props.backToTables}>Back to Table View</button>
        </div>
    )
  }



  export default CurrentTableStatus;