import React, { Component } from 'react'  
import BootstrapTable from 'react-bootstrap-table-next';  
import axios from 'axios';  
//import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator'; 
export class MsTrackerTable extends Component {  
        state = {  
                msTracker: [],  
                columns: [
                {  
                  dataField: 'msName',  
                  text: 'Microservice Name',  
                //   filter: textFilter()  
                },
                {  
                    dataField: 'isProfReq',  
                    text: 'Profiling Required?',  
                   sort:true  
                  },
                  {  
                    dataField: 'profStatus',  
                    text: 'Profiling Status',  
                   sort:true  
                  },
                  {  
                    dataField: 'bcStatus',  
                    text: 'Base Configuration Status',  
                   sort:true  
                  },
                  {  
                    dataField: 'isPtRequired',  
                    text: 'PT Required?',  
                   sort:true  
                  },
                   {  
                  dataField: 'ftStatus',  
                  text: 'Functional Test Status'
                }]  
              }  
              componentDidMount() {    
                axios.get('http://localhost:8080/api/mstracker/mstracker').then(response => {    
                  console.log(response.data);    
                  this.setState({    
                    msTracker   : response.data    
                  });    
                });    
              }   
        render() {  
            const options = {  
                page: 2,   
                sizePerPageList: [ {  
                  text: '5', value: 5  
                }, {  
                  text: '10', value: 10  
                }, {  
                  text: 'All', value: this.state.msTracker.length  
                } ],   
                sizePerPage: 3,   
                pageStartIndex: 0,   
                paginationSize: 3,    
                prePage: 'Prev',   
                nextPage: 'Next',   
                firstPage: 'First',   
                lastPage: 'Last',   
                paginationPosition: 'top' 
            };
                return (  
                        <div className="container">  
                        <div class="row" className="hdr">    
                            <div class="col-sm-12 btn btn-info">    
                                MS Tracker   
                            </div>    
                        </div>    
                        <div  style={{ marginTop: 20 }}>  
                        <BootstrapTable   
                        striped  
                        hover  
                        keyField='msName'   
                        data={ this.state.msTracker }   
                        columns={ this.state.columns }
                        // filter={ filterFactory() }
                        pagination={ paginationFactory(options) }
                         />  
                      </div>  
                      </div>  
                )  
        }  
}  
  
export default MsTrackerTable  