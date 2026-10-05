/**
 * BKK ALOR LINTANG - GOOGLE APPS SCRIPT
 * 1. Buat Google Sheet baharu.
 * 2. Extensions > Apps Script.
 * 3. Tampal kod ini.
 * 4. Gantikan SHEET_ID dengan ID Google Sheet.
 * 5. Deploy > New deployment > Web app.
 * 6. Execute as: Me. Who has access: sesiapa yang mempunyai pautan.
 * 7. Masukkan URL Web App ke Tetapan Sambungan dalam aplikasi.
 *
 * Untuk keselamatan, kongsi URL hanya kepada AJK yang dibenarkan.
 */
const SHEET_ID = 'GANTIKAN_DENGAN_ID_GOOGLE_SHEET';
const SHEET_NAME = 'Rekod Ahli';

function getSheet_(){
  const ss=SpreadsheetApp.openById(SHEET_ID);
  let sh=ss.getSheetByName(SHEET_NAME);
  if(!sh) sh=ss.insertSheet(SHEET_NAME);
  if(sh.getLastRow()===0){
    sh.appendRow(['Tarikh Rekod','Nama Ahli','Nombor Keahlian','Nombor Kad Pengenalan','Tarikh Lahir','Umur Permohonan','Nombor Telefon','Alamat Tetap','Poskod','Nama Waris','Hubungan','Telefon Waris','Status']);
  }
  return sh;
}
function doPost(e){
  try{
    const body=JSON.parse(e.postData.contents||'{}');
    if(body.action==='replaceAll'){
      const sh=getSheet_();
      if(sh.getLastRow()>1) sh.getRange(2,1,sh.getLastRow()-1,sh.getLastColumn()).clearContent();
      const r=body.records||[];
      if(r.length){
        const rows=r.map(x=>[new Date(),x.nama,x.noAhli,x.kp,x.lahir,x.umur,x.telefon,x.alamat,x.poskod,x.waris,x.hubungan,x.telefonWaris,x.status]);
        sh.getRange(2,1,rows.length,rows[0].length).setValues(rows);
      }
      return out_({ok:true,message:'Data berjaya diselaraskan ke Google Sheets.'});
    }
    return out_({ok:false,message:'Arahan tidak dikenali.'});
  }catch(err){return out_({ok:false,message:String(err)});}
}
function doGet(){return out_({ok:true,message:'BKK Alor Lintang aktif.'});}
function out_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
