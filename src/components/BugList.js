import { useState } from 'react';
import BugListItem from './BugListItem';
import _ from 'lodash';

function BugList(props) {
  const [bugs, setBugs] = useState([
    {
      id: 1,
      title: 'Add a Navbar',
      description: 'Add a robust and functioning navbar that matches the theme of the website.',
      bugClass: 'feature',
    },
    {
      id: 2,
      title: 'Fix Contact Page Bug',
      description:
        'Upon submitting a message on the contact page, there is an error that occurs and will not submit the message to the system.',
      bugClass: 'bug',
    },
    {
      id: 3,
      title: 'Add a Footer',
      description:
        'A footer needs to be added that includes our companies address, phone number, and hours. There also needs to be links for our social media pages.',
      bugClass: 'feature',
    },
  ]);

  return (
    <div className="container col-12 col-md-10 col-lg-10 col-xl-10">
      <div className="mt-5" id="login-component">
        <div className="card shadow-2-strong" id="rounded-corner">
          <div className="card-body p-5 text-center">
            <h3 className="mb-1">Bug List</h3>
            <h5 className="mb-5">Welcome {props.fullName}</h5>
            <div className="d-flex flex-wrap form-outline mb-4 align-content-around justify-content-center">
              {_.map(bugs, (bug) => (
                <BugListItem key={bug.id} bug={bug} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BugList;
