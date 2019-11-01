import { Meteor } from 'meteor/meteor';
import { Stuffs } from './Stuff.js';
import { assert } from 'chai';
import { Random } from 'meteor/random';

if (Meteor.isServer) {
  describe('Stuffs', () => {
    describe('methods', () => {
      const username = 'placide';
      let listId , userId;

            before(()=>{
              let user = Meteor.users.findOne({username: username});
              if(!user){
                userId = Accounts.createUser({
                  'username': username,
                  'email' : 'test@test.com',
                  'password': '123467ZYZ',
                });

              } else {
                userId = user._id;
              }
            });

            beforeEach(() => {
              Stuffs.remove({});
              listId = Stuffs.insert({
                name: 'placide',
                surname: 'jean',
                age: 22,
                owner: userId,
                country: 'Congo'
              });
            });


      //Insert TEST
      it('can insert task' , ()=>{
        let name: 'placide',
        let surname: 'jean',
        let age: 22,
        let owner: userId,
        let country: 'Congo' ;
        const insert = Meteor.server.method_handlers['Stuffs.insert'];
        const invocation = { userId };
        insert.apply(invocation, [name , surname , age , country]);
        assert.equal(Stuffs.find().count(), 2);
      });

      it('cannot insert task if not logged in ' , ()=>{
        let name: 'placide',
        let surname: 'jean',
        let age: 22,
        let owner: userId,
        let country: 'Congo' ;
        const insert = Meteor.server.method_handlers['Stuffs.insert'];
        const FakeId = {};
        assert.throws(()=>{insert.apply(FakeId , [name , surname , age , country]);
        } , Meteor.Error ,'[not-authorized]');
        assert.equal(Stuffs.find().count(),1);

      });
            //Delete
            it('can delete owned task', () => {

              const deleteList = Meteor.server.method_handlers['Stuffs.remove'];

              // Set up a fake ID
              const FakeId = { userId };


              deleteList.apply(FakeId, [listId]);

              assert.equal(Stuffs.find().count(), 0);
            });
    });
  });
}
