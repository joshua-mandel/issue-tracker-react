import { FaLinkedin, FaGithub, FaReact, FaNode } from 'react-icons/fa';
import { SiMongodb, SiExpress } from 'react-icons/si';

function Footer() {
  const linkedInLink = 'https://www.linkedin.com/in/joshua-mandel-ab382919a/';
  const gitHubLink = 'https://github.com/joshua-mandel';

  return (
    <footer className="bg-dark text-white p-2">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className='my-2'>
            <div className="my-1  my-2">&copy; Joshua Mandel 2022</div>
            <div className="d-flex align-items-center my-2">
              <div className="me-2">Built with</div>
              <SiMongodb className="m-1 fs-4" />
              <SiExpress className="m-1 fs-4" />
              <FaReact className="m-1 fs-4" />
              <FaNode className="m-1 fs-3" />
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
