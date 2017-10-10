process.env.NODE_ENV = 'test';

//dev dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
let server = require('../app-server');
let should = chai.should();

chai.use(chaiHttp);

  describe('Check server', () => {
    it('should start the server', (done) => {
      chai.request(server)
        .get('/api')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string');
            res.body.length.should.be.eql(26);
          done();
        })
    })
  })
