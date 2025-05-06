const objectA = {
    property1: 'value1',
    objectB: {
      nestedProperty: 'nestedValue'
    }
  };
  
  // Destructuring
  const { objectB } = objectA;
  
  // Thay đổi qua biến mới
  objectB.nestedProperty = 'changedValue1';
  
  // Kiểm tra
  console.log(objectA.objectB.nestedProperty); // 'changedValue'
  console.log(objectB === objectA.objectB);    // true - cùng reference