import { useState } from 'react';
import { BugListItem } from './BugListItem';

function BugList() {
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

  function onEditButtonClick() {
    let selectedId = null;
  }
  return (
    <div>
      <BugListItem></BugListItem>
      <BugListItem></BugListItem>
      <BugListItem></BugListItem>
    </div>
  );
}

export default BugList;
