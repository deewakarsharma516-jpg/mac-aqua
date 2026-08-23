/*  MAC AQUA FILTRATION — Google Sheet backend (Apps Script)
    -----------------------------------------------------------
    Ye code aapki Google Sheet ke Apps Script me paste karke
    "Web app" ki tarah Deploy karna hai. (Steps README me hain.)

    Sheet apne aap 2 tabs bana legi:
      Config   -> B1 cell me admin PASSWORD (default: admin123)
      Products -> products ki list (Name, Model, Category, Capacity, Description, Image URL)
    Password badalna ho to Config sheet ke B1 cell me naya likh do.
*/

function ensureSheets_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var cfg = ss.getSheetByName('Config');
  if (!cfg) {
    cfg = ss.insertSheet('Config');
    cfg.getRange('A1').setValue('Admin Password');
    cfg.getRange('B1').setValue('admin123');
    cfg.getRange('A1').setFontWeight('bold');
  }
  var pr = ss.getSheetByName('Products');
  if (!pr) {
    pr = ss.insertSheet('Products');
    pr.getRange(1, 1, 1, 6).setValues([['Name', 'Model', 'Category', 'Capacity', 'Description', 'Image URL']]);
    pr.getRange(1, 1, 1, 6).setFontWeight('bold');
  }
  return { cfg: cfg, pr: pr };
}

function getPassword_() {
  var s = ensureSheets_();
  return String(s.cfg.getRange('B1').getValue() || '');
}

function readProducts_() {
  var s = ensureSheets_();
  var vals = s.pr.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < vals.length; i++) {
    var r = vals[i];
    if (!r[0] && !r[1]) continue;
    out.push({
      name: r[0], model: r[1], category: r[2],
      capacity: r[3], description: r[4], image: r[5]
    });
  }
  return out;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* Public read: website/admin fetch products here */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'products';
  if (action === 'login') {
    return json_({ ok: (e.parameter.pw || '') === getPassword_() });
  }
  return json_({ ok: true, products: readProducts_() });
}

/* Admin actions (need correct password) */
function doPost(e) {
  var data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad-json' }); }

  var pw = getPassword_();
  if (data.action === 'login') {
    return json_({ ok: (data.pw || '') === pw });
  }
  if ((data.pw || '') !== pw) {
    return json_({ ok: false, error: 'wrong-password' });
  }

  var s = ensureSheets_();
  var pr = s.pr;

  if (data.action === 'save') {
    var rows = (data.products || []).map(function (p) {
      return [p.name || '', p.model || '', p.category || '', p.capacity || '', p.description || '', p.image || ''];
    });
    pr.clearContents();
    pr.getRange(1, 1, 1, 6).setValues([['Name', 'Model', 'Category', 'Capacity', 'Description', 'Image URL']]);
    pr.getRange(1, 1, 1, 6).setFontWeight('bold');
    if (rows.length) pr.getRange(2, 1, rows.length, 6).setValues(rows);
    return json_({ ok: true, products: readProducts_() });
  }

  if (data.action === 'add') {
    var p = data.product || {};
    pr.appendRow([p.name || '', p.model || '', p.category || '', p.capacity || '', p.description || '', p.image || '']);
    return json_({ ok: true, products: readProducts_() });
  }

  return json_({ ok: false, error: 'unknown-action' });
}
