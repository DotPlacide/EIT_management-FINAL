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
      it('can insert EIT' , ()=>{
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

      it('cannot insert EIT if not logged in ' , ()=>{
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
            it('can delete owned EIT', () => {

              const deleteList = Meteor.server.method_handlers['Stuffs.remove'];

              // Set up a fake ID
              const FakeId = { userId };


              deleteList.apply(FakeId, [listId]);

              assert.equal(Stuffs.find().count(), 0);
            });
            it("cannot delete someone else's EIT", () =>{

        // Set  to private
        Stuffs.update(taskId, { $set: { private: true } });

        const userId = Random.id();

        const deleteList = Meteor.server.method_handlers['Stuffs.remove'];
        const FakeId = { userId };

        assert.throws(function() {
          deleteTask.apply(FakeId, [listId]);
        }, Meteor.Error, '[not-authorized]');

        // Verify  task is'nt deleted
        assert.equal(Stuffs.find().count(), 1);
      });

          it('can set own task checked' , ()=>{
            const setChecked =Meteor.server.method_handlers['tasks.setChecked'] ;
            const FakeId = {userId};
            setChecked.apply(FakeId , [listId, true]);
            assert.equal(Stuffs.find({checked:true}).count(),1);
          });

          it("cannot set someone else's EIT checked" ,()=> {
            Stuffs.update(taskId, {$set: {private : true }});

            const userId = Random.id();
            const setChecked = Meteor.server.method_handlers['Stuffs.setChecked'];
            const FakeId = { userId };

            assert.throw(()=>{
              setChecked.apply(FakeId , [listId , true]);
            } , Meteor.Error, '[not-authorized]');
            assert.equal(Stuffs.find({checked:true}).count(),0);
          });

          it('can set own EIT private', () => {
            const setTaskPrivate = Meteor.server.method_handlers['Stuffs.setPrivate'];
            const FakeId = { userId };
            setTaskPrivate.apply(FakeId, [listId, true]);
            assert.equal(Stuffs.find({private: true}).count(), 1);
          });
          it("cannot set someone else's EIT private", function() {
            const userId = Random.id();

            const setPrivate = Meteor.server.method_handlers['Stuffs.setPrivate'];
            const FakeId = { userId };


            assert.throws(function() {
              setPrivate.apply(FakeId, [listId, true]);
            }, Meteor.Error, '[not-authorized]');

            assert.equal(Tasks.find({private: true}).count(), 0);
  })
      it('can view own EIT and non-private tasks', () => {
       const userId = Random.id()
       Stuffs.insert({
        let name: 'placide',
        let surname: 'jean',
        let age: 22,
        let owner: userId,
        let country: 'Congo' ;
       })
       const FakeId = { userId }
       const LIstsPublication = Meteor.server.publish_handlers.Stuffs
       assert.strictEqual(LIstsPublication.apply(invocation).count(), 2)
     })
    });
  });
}
