/**
 Class to deal with handling config values for the script
 config {name : value} pairs can be stored in a sheet named 'config'
 use column A for the variable names and column B for the varaible values
 **/

class Config {
  constructor(spreadsheetId, config) {
    this.spreadsheetId = spreadsheetId;
    this.values = this.getConfig();
  }

  getConfig() {
    let config = {};
    // add spreadhseet id to the config so you do not have to pass it around as well
    const values = Sheets.Spreadsheets.Values.get(config.sheetId, 'config!A:B').values;
    values.forEach( (item) => {
      if (!!item[0]) {
        config[item[0]] = item[1];
      }
    });

    config['sheetId'] = this.spreadsheetId;

    console.log('Config', config);
    return config;
  }

}
