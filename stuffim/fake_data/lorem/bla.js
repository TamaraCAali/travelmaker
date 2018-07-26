[
    {
      'repeat(5, 10)': {
        _id: '{{objectId()}}',
        creatorId: '{{objectId()}}',
        name:  'Tiyul Tiyul Tiyul ' + '{{index()}}',
        loc:{
            lat: '{{floating(-90.000001, 90)}}',
            lng: '{{floating(-180.000001, 180)}}',
        },
        estTime:'{{index()+2}}',
        desc: '{{lorem(1, "paragraphs")}}',
        img: 'http://stories4kid.com/313667_170.jpg',
        attends:[
            {
            'repeat(5)': '{{objectId()}}'
            }],
        isPrivate: '{{bool()}}',
        isFull: '{{bool()}}',        
        maxCapacity: 4,        
        date: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
        tags: [
          {
            'repeat(5)': '{{lorem(1, "words")}}'
          }
        ],
        level: 1,
      }
    }
  ]