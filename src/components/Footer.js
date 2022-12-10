import { FaLinkedin, FaGithub, FaReact, FaNode } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white p-2">
      <div className="container">
        <div className='d-flex align-items-center justify-content-between'>
          <div>&copy; Joshua Mandel 2022</div>
          <div className='d-flex align-items-center'>
            <div className='me-2'>Built with</div>
            <FaReact className='m-2 fs-3' />
            <FaNode className='m-2 fs-3' />
          </div>
          <div>
            <div>
            <FaLinkedin className='m-3 fs-2' />
            <FaGithub className='m-3 fs-2' />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
