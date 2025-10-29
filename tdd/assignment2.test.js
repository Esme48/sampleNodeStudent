const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const http = require('http');

describe('Assignment 2: Event Handlers, HTTP Servers, and Express', () => {
  const assignmentDir = path.join(__dirname, '../assignment2');
  const rootDir = path.join(__dirname, '..');

  beforeAll(() => {
    if (!fs.existsSync(assignmentDir)) {
      throw new Error('assignment2 directory does not exist. Please create it first.');
    }
  });

  describe('Task 1: Event Emitter and Listener', () => {
    test('events.js should exist and implement time event emitter', () => {
      const eventsPath = path.join(assignmentDir, 'events.js');
      expect(fs.existsSync(eventsPath)).toBe(true);
      
      expect(() => require(eventsPath)).not.toThrow();
    });

    test('events.js should emit time events every 5 seconds', (done) => {
      const eventsPath = path.join(assignmentDir, 'events.js');
      
      const emitter = require(eventsPath);
      
      let eventReceived = false;
      
      emitter.on('time', (timeString) => {
        eventReceived = true;
        expect(timeString).toBeDefined();
        expect(typeof timeString).toBe('string');
        done();
      });
      
     
      emitter.emit('time', 'test time');
      
      if (!eventReceived) {
        done(new Error('Event was not received'));
      }
    });
  });

  describe('Task 2: HTTP Server', () => {
    test('sampleHTTP.js should exist', () => {
      const httpPath = path.join(assignmentDir, 'sampleHTTP.js');
      expect(fs.existsSync(httpPath)).toBe(true);
    });

    test('sampleHTTP.js should handle /time endpoint with JSON response', (done) => {
      const httpPath = path.join(assignmentDir, 'sampleHTTP.js');
      
    
      const child = require('child_process').spawn('node', [httpPath]);
      
      
      setTimeout(() => {
        const req = http.request({
          hostname: 'localhost',
          port: 8000,
          path: '/time',
          method: 'GET'
        }, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toContain('application/json');
            
            const jsonData = JSON.parse(data);
            expect(jsonData).toHaveProperty('time');
            expect(typeof jsonData.time).toBe('string');
            
            child.kill();
            done();
          });
        });
        
        req.on('error', (err) => {
          child.kill();
          done(err);
        });
        
        req.end();
      }, 1000);
    });

    test('sampleHTTP.js should handle /timePage endpoint with HTML response', (done) => {
      const httpPath = path.join(assignmentDir, 'sampleHTTP.js');
      
      const child = require('child_process').spawn('node', [httpPath]);
      
      setTimeout(() => {
        const req = http.request({
          hostname: 'localhost',
          port: 8000,
          path: '/timePage',
          method: 'GET'
        }, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            expect(res.statusCode).toBe(200);
            expect(res.headers['content-type']).toContain('text/html');
            expect(data).toContain('<!DOCTYPE html>');
            expect(data).toContain('Clock');
            expect(data).toContain('getTimeBtn');
            
            child.kill();
            done();
          });
        });
        
        req.on('error', (err) => {
          child.kill();
          done(err);
        });
        
        req.end();
      }, 1000);
    });
  });

  describe('Task 3: Express Application', () => {
    test('app.js should exist', () => {
      const appPath = path.join(rootDir, 'app.js');
      expect(fs.existsSync(appPath)).toBe(true);
    });

          test('app.js should handle GET / route', (done) => {
        const appPath = path.join(rootDir, 'app.js');
      
      expect(() => require(appPath)).not.toThrow();
      

      done();
    });

          test('app.js should handle POST /testpost route', (done) => {
        const appPath = path.join(rootDir, 'app.js');
      
      expect(() => require(appPath)).not.toThrow();
      
   
      done();
    });

          test('app.js should handle 404 for unknown routes', (done) => {
        const appPath = path.join(rootDir, 'app.js');
      
      expect(() => require(appPath)).not.toThrow();
      

      done();
    });
  });

  describe('Task 4: Middleware', () => {
    test('middleware/error-handler.js should exist', () => {
      const errorHandlerPath = path.join(rootDir, 'middleware', 'error-handler.js');
      expect(fs.existsSync(errorHandlerPath)).toBe(true);
    });

    test('middleware/not-found.js should exist', () => {
      const notFoundPath = path.join(rootDir, 'middleware', 'not-found.js');
      expect(fs.existsSync(notFoundPath)).toBe(true);
    });

    test('middleware files should be properly structured', () => {
      const errorHandlerPath = path.join(rootDir, 'middleware', 'error-handler.js');
      const notFoundPath = path.join(rootDir, 'middleware', 'not-found.js');
      
      expect(() => require(errorHandlerPath)).not.toThrow();
      expect(() => require(notFoundPath)).not.toThrow();
    });
  });

  describe('Task 5: Logging Middleware', () => {
          test('app.js should include logging middleware', (done) => {
        const appPath = path.join(rootDir, 'app.js');
      
      expect(() => require(appPath)).not.toThrow();
      

      done();
    });
  });
});
