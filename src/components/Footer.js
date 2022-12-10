import { FaLinkedin, FaGithub, FaReact, FaNode } from 'react-icons/fa';
import { SiMongodb, SiExpress } from 'react-icons/si';

function Footer() {
  const linkedInLink = 'https://www.linkedin.com/in/joshua-mandel-ab382919a/';
  const gitHubLink = 'https://github.com/joshua-mandel';
  const mongoDbLink = 'https://www.mongodb.com/home';
  const expressJsLink = 'https://expressjs.com/';
  const reactJsLink = 'https://reactjs.org/';
  const nodeJsLink = 'https://nodejs.org/en/';

  return (
    <footer className="bg-dark text-white p-2">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className='my-2'>
            <div className="my-1  my-2">&copy; Joshua Mandel 2022</div>
            <div className="d-flex align-items-center my-2">
              <div className="me-2">Built with</div>
              <a className="text-decoration-none text-white" href={mongoDbLink} rel="noreferrer" target="_blank"><SiMongodb className="m-1 fs-4" /></a>
              <a className="text-decoration-none text-white" href={expressJsLink} rel="noreferrer" target="_blank"><SiExpress className="m-1 fs-4" /></a>
              <a className="text-decoration-none text-white" href={reactJsLink} rel="noreferrer" target="_blank"><FaReact className="m-1 fs-4" /></a>
              <a className="text-decoration-none text-white" href={nodeJsLink} rel="noreferrer" target="_blank"><FaNode className="m-1 fs-3" /></a>
            </div>
          </div>
          <div>
            <div>
              <a className="text-decoration-none text-white" href={linkedInLink} rel="noreferrer" target="_blank">
                <FaLinkedin className="m-3 fs-1" />
              </a>
              <a href={gitHubLink} className="text-white text-decoration-none" rel="noreferrer" target="_blank">
                <FaGithub className="m-3 fs-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
