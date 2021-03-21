import React from 'react';
import logo from './logo.svg';
import './App.css';
import Checkbox from '@material-ui/core/Checkbox'

var userCalendars = [];
var calendarCheckboxes = [];
var gapi = window.gapi
var testArray = ['Apple', 'Orange', 'Banana']
var CLIENT_ID = "290575928168-t5ldr36ol80tmt61mug1k2c8s3t6c7f2.apps.googleusercontent.com"
var API_KEY = "AIzaSyCX2K1zhs3o_Dbj9-EVnELrbNohM98xCXM"
var DISCOVER_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar.events"


//var testArray = [<input type="checkbox" key='0'>Apple</input>, <input type="checkbox" key='1'>Orange</input>, <input type="checkbox" key='2'>Banana</input>];

const handleClick = () =>
{
    gapi.load('client:auth2', () =>
      {
        console.log('loading...')

        gapi.client.init(
          {
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVER_DOCS,
            scope: SCOPES
          })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn().then(() => {

              var event = {
                'summary': 'Google I/O 2015',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'A chance to hear more about Google\'s developer products.',
                'start': {
                  'dateTime': '2015-05-28T09:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'end': {
                  'dateTime': '2015-05-28T17:00:00-07:00',
                  'timeZone': 'America/Los_Angeles'
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                  {'email': 'lpage@example.com'},
                  {'email': 'sbrin@example.com'}
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                  ]
                }
              };
              /*
              var request = gapi.client.calender.events.insert({
                'calendarId': 'primary',
                'resource': event,
              })

            request.execute(event => {
              window.open(event.htmlLink)
            })
          */

            /*
            gapi.client.calendar.events.list({
              'calendarId': 'primary',
              'timeMin': (new Date()).toISOString(),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 10,
              'orderBy': 'startTime'
            }).then(response => {
              const events = response.result.items
              console.log('EVENTS: ', events)
              })
              */

              console.log("Getting calendars...");
              gapi.client.calendar.calendarList.list().then(promise => 
               {
                 for(let i = 0; i < promise.result.items.length; i++)
                   userCalendars.push(promise.result.items[i])
         
                   testFunction();
               }
                 )
               .catch(e => console.log(e))

               function testFunction()
               {
                
                console.log("there are " + userCalendars.length + " calendars in the array")

                userCalendars.forEach((item,index) => {
                  calendarCheckboxes.push(item)
                  //calendarCheckboxes.push( <input type="checkbox" id={item.id} key={index}>{item.summary}</input>)
                })
              
                calendarCheckboxes.forEach(calendar =>
                  console.log(calendar)) 
              }
            
              
        })
      }
    )};

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hasCalendars: false
    }
  }


 /*       function checkBox(props){
          return <input type="checkbox" id={}></input>
        }
        function sayHi(){
          return <h1>Hello!</h1>
        }
*/

  /* simple functional components are the raw dogs of components. This is how I loop through the calendar array and insert the elements 

function QuipComponent() {
  return <p>Outside of a dog, a book is a man’s best friend. Inside of a dog, it’s too dark to read.</p>;
}
<div id="app"></div> 
ReactDOM.render(<QuipComponent />, document.querySelector("#app"));

*/
render(){
  return (
    <div className="App">
        <button onClick={handleClick}>Log In</button>
        
        <button onClick={handleClick}>Log In</button>
        
        <center>
      <h2>Welcome to Study Scheduler</h2>
    </center>

    <button id="authorize_button" style="display: none;">Authorize</button>
    <button id="signout_button" style="display: none;">Sign Out</button>

    <pre id="content" style="white-space: pre-wrap;"></pre>

    <div className="row">

      <div className="column-left" style="background-color: #aaa;">

        <div className="text" style="background-color: #aaa;">
            <h3> Select Calendar(s)</h3>
            <form action="/action_page.php" method="get">

              <input type="checkbox" className="Calendar1"/>
              <label htmlFor="Calendar1"> Calendar 1</label><br/>

              <input type="checkbox" className="Calendar2" />
              <label htmlFor="Calendar2"> Calendar 2</label><br/>

              <input type="checkbox" className="Calendar3" />
              <label htmlFor="Calendar3"> Calendar 3</label><br/>

              <input type="checkbox" className="Calendar4" />
              <label htmlFor="Calendar4"> Calendar 4</label><br/>

              <input type="checkbox" className="Calendar5" />
              <label htmlFor="Calendar5"> Calendar 5</label><br/>

              <input type="submit"/>

              <input type="new-assignment" />
            </form><br/><br/><br/><br/>

            <form action="/action_page.php" className="form-container">
              <h3>Create New Assignment!</h3>
          
              <label htmlFor="assignment-name">Assignment Name</label>
              <input type="text" id="assignment-name" name="assignment-name" required/><br/>
          
              <label htmlFor="class">Class</label>
              <input type="text" id="class" name="class" required/><br/>

              <label htmlFor="estimated-time">Estimated Time (between 1 and 5):</label>
              <input type="number" id="estimated-time" name="estimated-time" min="1" max="5"/><br/>

              <label htmlFor="days-till-due">Days Until Due Date (between 1 and 5)</label>
              <input type="number" id="days-till-due" name="days-till-due" min="1" max="5" required/><br/>
          
              <button type="submit" className="btn">Submit</button>
              <button type="submit" className="submit">Close</button><br/>
            </form>
        </div>
        
      </div>

      <div className="column-right" style={{backgroundcolor: "#aaa"}}>

        <iframe src={"https://calendar.google.com/calendar/embed?src=jdbake15%40asu.edu&src=1tagd0qckrva2tfh6nucqf34sg0g4ckj%40import.calendar.google.com&ctz=America%2FPhoenix"} style="border: 0" width="800" height="600" frameBorder="0" scrolling="no"></iframe>
      </div>
    </div>
     {
       calendarCheckboxes.map((calendar, index) => 
       {
      <Checkbox
      id={calendar.summary}
      inputProps={{ 'aria-label': 'primary checkbox' }}/>
       })
     }   
        
        
    </div>
  );
}
}


export default App;

/*
        <button onClick={handleClick}>Log In</button>
        
        <center>
      <h2>Welcome to Study Scheduler</h2>
    </center>

    <button id="authorize_button" style="display: none;">Authorize</button>
    <button id="signout_button" style="display: none;">Sign Out</button>

    <pre id="content" style="white-space: pre-wrap;"></pre>

    <div class="row">

      <div class="column-left" style="background-color: #aaa;">

        <div class="text" style="background-color: #aaa;">
            <h3> Select Calendar(s)</h3>
            <form action="/action_page.php" method="get">

              <input type="checkbox" name="Calendar1" value="" />
              <label for="Calendar1"> Calendar 1</label><br/>

              <input type="checkbox" name="Calendar2" value="" />
              <label for="Calendar2"> Calendar 2</label><br/>

              <input type="checkbox" name="Calendar3" value="" />
              <label for="Calendar3"> Calendar 3</label><br/>

              <input type="checkbox" name="Calendar4" value="" />
              <label for="Calendar4"> Calendar 4</label><br/>

              <input type="checkbox" name="Calendar5" value="" />
              <label for="Calendar5"> Calendar 5</label><br/>

              <input type="submit" value="Submit" />

              <input type="new-assignment" value="New Assignment" />
            </form><br/><br/><br/><br/>

            <form action="/action_page.php" class="form-container">
              <h3>Create New Assignment!</h3>
          
              <label for="assignment-name">Assignment Name</label>
              <input type="text" id="assignment-name" name="assignment-name" required/><br/>
          
              <label for="class">Class</label>
              <input type="text" id="class" name="class" required/><br/>

              <label for="estimated-time">Estimated Time (between 1 and 5):</label>
              <input type="number" id="estimated-time" name="estimated-time" min="1" max="5"/><br/>

              <label for="days-till-due">Days Until Due Date (between 1 and 5)</label>
              <input type="number" id="days-till-due" name="days-till-due" min="1" max="5" required/><br/>
          
              <button type="submit" class="btn">Submit</button>
              <button type="submit" class="submit" onclick="closeForm()">Close</button><br/>
            </form>
        </div>
        
      </div>

      <div class="column-right" style="background-color: #aaa;">

        <iframe src={"https://calendar.google.com/calendar/embed?src=jdbake15%40asu.edu&src=1tagd0qckrva2tfh6nucqf34sg0g4ckj%40import.calendar.google.com&ctz=America%2FPhoenix"} style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
      </div>
    </div>
    */