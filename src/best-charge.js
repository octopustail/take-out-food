function getItems(selectedItems, allItems) {
  var itemList = [];

  for (var i = 0; i < selectedItems.length; i++) {
    var item = selectedItems[i].split(' x '),
      itemId = item[0],
      itemCount = item[1];
    for (var j = 0; j < allItems.length; j++) {
      if (itemId == allItems[j].id) {
        itemList.push({
          'id': allItems[j].id,
          'name': allItems[j].name,
          'price': allItems[j].price,
          'count': itemCount
        })

      }
    }
  }
  return itemList;
}

function generateItemList(itemList) {
  var itemOrderList = [];
  var total = 0;
  for (var i = 0; i < itemList.length; i++) {
    var itemPriceStr;
    total = total + itemList[i].price * itemList[i].count;
    itemPriceStr = itemList[i].name + ' x ' + itemList[i].price + ' = ' + total + '元';
    itemOrderList.push(itemPriceStr);
  }
  return {'itemOrderList': itemOrderList, 'total': total}
}

function generatePromotes(itemList, promotions, total) {
  var
    promoteStr = '',
    itemName = [],
    budget1 = 0,
    budget2 = 0,
    maxbudget = 0,
    promotionsItem = promotions[1].items,
    promoteInfo;

  if (total >= 30) {

    budget1 = 6;

  }

  for (var j = 0; j < itemList.length; j++) {
    if (promotionsItem.indexOf(itemList[j].id) !== -1) {
      itemName.push(itemList[j].name);
      budget2 = budget2 + itemList[j].price / 2;

    }
  }
  promoteStr2 = itemName.toString().split(',').join('，');


  if (budget1 > budget2) {
    promoteStr = promotions[0].type;
    maxbudget = budget1;
  } else {
    promoteStr = promotions[1].type + '(' + promoteStr2 + ')';
    maxbudget = budget2;
  }

  total = total - maxbudget;

  if (maxbudget == 0) {
    return promoteInfo = '总计：' + total + '元\n' + '===================================';
  } else {
    promoteInfo = '使用优惠:\n' + promoteStr + '，' + '省' + maxbudget + '元\n'
      + '-----------------------------------\n'

      + '总计：' + total + '元\n' +
      '===================================';
  }
  return promoteInfo;
}


function bestCharge(selectedItems) {
  var allItems = loadAllItems();
  var promotions = loadPromotions();
  var itemList,
    itemListObj,
    itemInfo = '',
    promoteInfo,
    result;

  itemList = getItems(selectedItems, allItems);

  itemListObj = generateItemList(itemList);
  console.log(itemListObj, 'itemListObj')

  promoteInfo = generatePromotes(itemList, promotions, itemListObj.total);

  for (var i = 0; i < itemList.length; i++) {
    itemInfo = itemInfo + itemList[i].name + ' x ' + itemList[i].count + ' = ' + itemList[i].count * itemList[i].price + '元\n'
  }
  result = '============= 订餐明细 =============\n' + itemInfo + '-----------------------------------\n' + promoteInfo;


  return result;
}
