const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, { useMongoClient: true });

const User = require('../models/user');
const Run = require('../models/run');
const Shape = require('../models/shape');

User.collection.drop();
Shape.collection.drop();
Run.collection.drop();

User.create([
  {
    username: 'mickeysausage',
    email: 'mickey1@mickey.com',
    stravaId: '21848',
    password: 'password',
    passwordConfirmation: 'password'
  },
  {
    username: 'sallysaunders',
    email: 'sally1@sally.com',
    stravaId: '21848',
    password: 'password',
    passwordConfirmation: 'password'
  },
  {
    username: 'egbertz',
    email: 'eggbert1@eggbert.com',
    stravaId: '21848',
    password: 'password',
    passwordConfirmation: 'password'
  },
  {
    username: 'lucygoosey',
    email: 'lucy1@lucy.com',
    stravaId: '21848',
    password: 'password',
    passwordConfirmation: 'password'
  },
  {
    username: 'daveyravey',
    email: 'davey1@davey.com',
    stravaId: '21848',
    password: 'password',
    passwordConfirmation: 'password'
  }
])
  .then(Users => {
    console.log(`${Users.length} new users added`);
    return Shape.create([
      {
        name: 'Unicorn',
        image: 'http://gclipart.com/wp-content/uploads/2017/03/Unicorn-outline-0-ideas-about-unicorn-head-on-animal-head-decor.jpg'
      },
      {
        name: 'Rabbit',
        image: 'https://i.pinimg.com/originals/b8/96/43/b896431e1d6c56598ee255bef91b351c.jpg'
      },
      {
        name: 'Cat',
        image: 'https://i.pinimg.com/736x/b5/a5/fc/b5a5fcfe367dde3c94ae7cbb5cd5ebb2--free-applique-patterns-applique-templates.jpg'
      },
      {
        name: 'Bird',
        image: 'http://www.vidopedia.com/wp-content/uploads/2017/10/outline-drawings-of-birds-free-download-clip-art-free-clip-art-intended-for-simple-animal-outlines.jpg'
      },
      {
        name: 'Bull',
        image: 'http://freevector.co/wp-content/uploads/2011/06/26121-cow-head-outline.png'
      },
      {
        name: 'Sea Horse',
        image: 'https://i.pinimg.com/736x/e2/8a/61/e28a6139ea98a64e5c2b82afb149a175--animal-templates-design-templates.jpg'
      }
    ])
      .then(Shape => {
        console.log(`${Shape.length} new shapes added`);
        return Run.create([
          {
            user: Users[0],
            ratings: [{
              value: 5,
              createdBy: Users[1]
            }, {
              value: 5,
              createdBy: Users[3]
            }],
            date: '2017-06-13T11:00:00Z',
            shape: Shape[0],
            summary_polyline: 'irkyHvra@uBnF~HjDsC|b@hJ_Uv]re@~Gc^uSat@~OaNuNukAu^`VuFnr@hGza@',
            start_latlng: [51.51040, -0.16617],
            comments: [{
              content: 'Unicorn!',
              createdBy: Users[1]
            }, {
              content: 'Fantastic!',
              createdBy: Users[2]
            }]
          },
          {
            user: Users[1],
            date: '2017-11-13T14:00:00Z',
            shape: Shape[0],
            summary_polyline: 'irkyHvra@uBnF~HjDsC|b@hJ_Uv]re@~Gc^uSat@~OaNuNukAu^`VuFnr@hGza@',
            start_latlng: [51.51040, -0.16617],
            comments: [{
              content: 'Great unicorn!',
              createdBy: Users[3]
            }, {
              content: 'Fantastic!',
              createdBy: Users[4]
            }]
          }
          // {
          //   user: Users[2],
          //   rating: [4.2],
          //   date: '2017-12-14T18:00:00Z',
          //   shape: Shape[1],
          //   summary_polyline: 'qajyHli`@_GbHUoc@tFaV?iRkO?k`@cAkBoc@iIzY_FpVaOjS~FlEvPuIhDxw@`\\~b@`[mErAio@',
          //   start_latlng: [51.50265, -0.17346],
          //   comments: [{
          //     content: 'Rabbit',
          //     createdBy: Users[1]
          //   }, {
          //     content: 'Brill',
          //     createdBy: Users[4]
          //   }]
          // },
          // {
          //   user: Users[3],
          //   rating: [4.5],
          //   date: '2017-12-14T18:00:00Z',
          //   shape: Shape[1],
          //   summary_polyline: 'g}iyHdvb@s@{o@kQ{SjPmb@UcPaOgXk`@tAuMtPuHfQ`K}EuDrOtHmE~HhKkFvg@jU~j@`a@fQ',
          //   start_latlng: [51.50265, -0.17346],
          //   comments: [{
          //     content: 'Rabbit',
          //     createdBy: Users[2]
          //   }, {
          //     content: 'Brill',
          //     createdBy: Users[0]
          //   }]
          // },
          // {
          //   user: Users[4],
          //   rating: [4.5],
          //   date: '2017-12-14T18:00:00Z',
          //   shape: Shape[2],
          //   summary_polyline: 'ijkyH`|b@`j@lEJ}nAa^tPkTlEtBhJh@vJ_DxJjSiKjTlE??kRpGkPrO',
          //   start_latlng: [51.50265, -0.17346],
          //   comments: [{
          //     content: 'Cat',
          //     createdBy: Users[5]
          //   }, {
          //     content: 'Brill',
          //     createdBy: Users[1]
          //   }]
          // },
          // {
          //   user: Users[3],
          //   rating: [4.5],
          //   date: '2017-12-14T18:00:00Z',
          //   shape: Shape[2],
          //   summary_polyline: 'ijkyH`|b@`j@lEJ}nAa^tPkTlEtBhJh@vJ_DxJjSiKjTlE??kRpGXzBVYbG}ApJxDaHnF',
          //   start_latlng: [51.50265, -0.17346],
          //   comments: [{
          //     content: 'Cat',
          //     createdBy: Users[2]
          //   }, {
          //     content: 'Brill',
          //     createdBy: Users[0]
          //   }]
          // },
          // {
          //   user: Users[2],
          //   rating: [4.5],
          //   date: '2017-12-14T18:00:00Z',
          //   shape: Shape[3],
          //   summary_polyline: 'irkyHja`@jXPuEaVjH}b@wNcWiJvJ~GzCuVza@hH|E`QkLkDnUiMlT',
          //   start_latlng: [51.50265, -0.17346],
          //   comments: [{
          //     content: 'Bird',
          //     createdBy: Users[3]
          //   }, {
          //     content: 'Brill',
          //     createdBy: Users[4]
          //   }]
          // },
          // {
          //   user: Users[1],
          //   rating: [4.1],
          //   date: '2017-10-14T18:00:00Z',
          //   shape: Shape[3],
          //   summary_polyline: 'iokyH|yb@jRdIHuWjPwu@hDkgAuXwX_AeIkLtPjC|SaPrm@`KvBhQq@iD~TuP`OUlE~Kza@uK`O',
          //   start_latlng: [51.50265, -0.17346],
          //   comments: [{
          //     content: 'Bird',
          //     createdBy: Users[4]
          //   }, {
          //     content: 'Awesome running skills',
          //     createdBy: Users[0]
          //   }]
          // },
          // {
          //   user: Users[0],
          //   rating: [4.1],
          //   date: '2017-10-14T18:00:00Z',
          //   shape: Shape[4],
          //   summary_polyline: 'sjkyHfab@_FnMhNfCjCqVjT{a@tGvBk@qU_Hr@kTo\\_QwXaH`V`MlE_Dvg@~G`d@',
          //   start_latlng: [51.50265, -0.17346],
          //   comments: [{
          //     content: 'Bull',
          //     createdBy: Users[1]
          //   }, {
          //     content: 'Awesome running skills',
          //     createdBy: Users[3]
          //   }]
          // },
          // {
          //   user: Users[1],
          //   rating: [4.1],
          //   date: '2017-10-14T18:00:00Z',
          //   shape: Shape[4],
          //   summary_polyline: 'izkyHlz_@hDkKu@o\\iLaO~MQ~C{DtBpGtJ|DhF?SvQkHhCuGpGI|S_GeA',
          //   start_latlng: [51.50265, -0.17346],
          //   comments: [{
          //     content: 'Bull',
          //     createdBy: Users[4]
          //   }, {
          //     content: 'Awesome running skills',
          //     createdBy: Users[0]
          //   }]
          // },
          // {
          //   user: Users[2],
          //   rating: [4.1],
          //   date: '2017-10-14T18:00:00Z',
          //   shape: Shape[5],
          //   summary_polyline: '_tkyHbj^tBPkD~TtDs@tFeXtLvQ~C_NiGgJuCpGtBsOtUjL^tf@_Nho@uLkSkBoMuJzD_EoF_FcP~Hmb@tDhC',
          //   start_latlng: [51.50265, -0.17346],
          //   comments: [{
          //     content: 'Seahorse',
          //     createdBy: Users[1]
          //   }, {
          //     content: 'Awesome running skills',
          //     createdBy: Users[4]
          //   }]
          // },
          // {
          //   user: Users[3],
          //   rating: [4.1],
          //   date: '2017-10-14T18:00:00Z',
          //   shape: Shape[5],
          //   summary_polyline: '_tkyHt~_@jNdA~JiCtCuu@_N}SaHzR~B|EtBsH~D{CjChRkK`VuPk[_@lTuFuWiJ`VhEn\\tIgJ~AhR',
          //   start_latlng: [51.50265, -0.17346],
          //   comments: [{
          //     content: 'Sea Horse',
          //     createdBy: Users[2]
          //   }, {
          //     content: 'Awesome running skills',
          //     createdBy: Users[0]
          //   }]
          // }
        ]);
      });



  })

  .then(Runs => console.log(`${Runs.length} runs created`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
