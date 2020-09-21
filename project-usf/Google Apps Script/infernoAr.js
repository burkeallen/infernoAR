class InfernoAR {

  constructor(config) {
    this.config = config
    this.token = this.fetchToken();
    this.AccessToken = 'Bearer ' + this.token.AccessToken;
    this.users = this.fetchUsers();
    this.clientId = this.token.ClientId;
  }

  fetchToken() {
    if (!this.config) {
      throw new Error('Config not Found');
    }
    if (!this.config.username || !this.config.password) {
      throw new Error('Inferno AR {username} or {password} is missing from config sheet');
    }
    if (!this.config.url) {
      throw new Error('Inferno AR API {url} is missing from config sheet');
    }

    const url = this.config.url + 'token'
    const payload = {
      'email': this.config.username,
      'password': this.config.password
    };

    const options = {
      'method': 'POST',
      'muteHttpExceptions': false,
      'contentType': 'application/json',
      'payload': JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      return JSON.parse(response.getContentText());
    } else {
      this.handleResponseError(response, 'POST', url, 'fetchToken');
      return {};
    }
  }

  fetchUsers() {
    const url = this.config.url + 'Users';
    const options = {
      'method': 'GET',
      'muteHttpExceptions': false,
      'headers': {
        'Authorization': this.AccessToken
      },
    };

    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      return JSON.parse(response.getContentText());
    } else {
      this.handleResponseError(response, 'GET', url, 'fetchUsers');
      return [];
    }

  }

  getGroupId(groupName) {
    // enhance this to pull all groups from system and match on "name" to get id
    // hard coding for now
    if (groupName.includes('Organizer')) {
      console.log('matched group', groupName);
      return '241b5022-2db9-4ed2-de05-08d859b74ada';
    }
    if (groupName.includes('Panelist')) {
      console.log('matched group', groupName);
      return 'd402d1dd-0c9e-40d0-a448-08d858b3bd5f';
    }
    if (groupName.includes('Presenter')) {
      console.log('matched group', groupName);
      return '22581604-f059-4082-a447-08d858b3bd5f';
    }
    if (groupName.includes('ARCHIVE')) {
      console.log('matched group', groupName);
      return 'f6e3ecd8-d7ee-40cc-922b-08d85e2f0fa1';
    }
    console.log('matched group', 'NONE');
    return '';

  }

  fetchProfile(id) {
    const url = this.config.url + `UserProfile/${id}`;
    const options = {
      'method': 'GET',
      'muteHttpExceptions': true,
      'headers': {
        'Authorization': this.AccessToken
      },
    };

    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      return JSON.parse(response.getContentText());
    } else if (response.getResponseCode() === 204) {
      //profile does not exist yet
      return {};
    } else {
      this.handleResponseError(response, 'GET', url, 'fetchProfile');
      return {};
    }
  }

  removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b)
  };

  addUser(newUser) {
    const user = this.getExistingUser(newUser.email);
    if (user.id) {
      return user;
    }

    const payload = {
      id: '00000000-0000-0000-0000-000000000000',
      email: newUser.email,
      firstName: newUser.firstName,
      surname: newUser.lastName,
      clientId: this.clientId,
      groups: [this.getGroupId(newUser.groupName)],
      defaultGroup: null,
      isSso: false
    }

    const url = this.config.url + 'AddUser';
    const options = {
      'method': 'POST',
      'muteHttpExceptions': true,
      'contentType': 'application/json',
      'headers': {
        'Authorization': this.AccessToken
      },
      'payload': JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      return JSON.parse(response.getContentText());
    } else {
      this.handleResponseError(response, 'POST', url, 'addUser');
      return [];
    }

  }

  updateUserGroups(user, groupName) {

    user.groups.push(this.getGroupId(groupName));
    const groups = this.removeDuplicates(user.groups);
    console.log('UPDATING GROUPS for user ' + user.email + ' => ', groups)

    const url = this.config.url + `GroupUsers/${user.id}`;
    const options = {
      'method': 'PUT',
      'muteHttpExceptions': true,
      'contentType': 'application/json',
      'headers': {
        'Authorization': this.AccessToken
      },
      'payload': JSON.stringify(groups)
    };

    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200 || response.getResponseCode() === 204) {
      return groups;
    } else {
      this.handleResponseError(response, 'PUT', url, 'updateUserGroups');
      return [];
    }

  }

  replaceUserGroup(user, groupName) {
    user = this.getExistingUser(user.email);
    if (!user.id) {
      // if user does not exist then we do not need to replace their group
      return;
    }
    const groupId = this.getGroupId(groupName);
    console.log('REPLACING GROUPS for user ' + user.email + ' => ', groupName)

    const url = this.config.url + `GroupUsers/${user.id}`;
    const options = {
      'method': 'PUT',
      'muteHttpExceptions': true,
      'contentType': 'application/json',
      'headers': {
        'Authorization': this.AccessToken
      },
      'payload': JSON.stringify([groupId])
    };

    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200 || response.getResponseCode() === 204) {
      return true;
    } else {
      this.handleResponseError(response, 'PUT', url, 'replaceUserGroup');
      return false;
    }

  }

  addProfile(id, user) {

    // determine if we need to create a profile or update a profile
    const profile = this.fetchProfile(id);
    const method = profile.userId ? 'PUT' : 'POST';
    const url = this.config.url + `UserProfile/${id}`;
    const payload = {
      "id": id,
      "userId": id,
      "bio": user.bio,
      "socialFacebook": user.facebook ? user.facebook : null,
      "socialTwitter": user.twitter ? user.twitter : null,
      "socialYoutube": user.youtube ? user.youtube : null,
      "socialLinkedIn": user.linkedIn ? user.linkedIn : null,
      "socialInstagram": user.instagram ? user.instagram : null,
      "contactInfoPhone": user.phone ? user.phone : null,
      "contactInfoCompany": user.org ? user.org : null,
      "contactInfoTitle": user.position ? user.position : null,
      "contactInfoEmail": user.email ? user.email : null,
      "hideProfilePrivacyOptOut": false,
    }

    const options = {
      'method': method,
      'muteHttpExceptions': true,
      'contentType': 'application/json',
      'headers': {
        'Authorization': this.AccessToken
      },
      'payload': JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(url, options);
    const data = response.getContentText();
    if (response.getResponseCode() === 200) {
      return JSON.parse(response.getContentText());
    } else {
      this.handleResponseError(response, method, url, 'addProfile');
      return {};
    }

  }

  addProfileImage(id, newUser) {
    if (!newUser.image) {
      return 'no image supplied';
    }

    const url = this.config.url + `ProfileImage/${id}`;

    const options = {
      'method': 'PUT',
      'muteHttpExceptions': true,
      'headers': {
        'Authorization': this.AccessToken
      },
      'payload': {
        file: DriveApp.getFileById(newUser.image).getBlob()
      }
    };

    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      return response.getContentText();
    } else {
      this.handleResponseError(response, 'PUT', url, 'add Profile Image');
      return {};
    }
  }

  getExistingUser(email) {
    const existingUser = this.users.filter(user => (user.email === email));
    if (existingUser.length) {
      return existingUser[0]
    }
    return {};
  }

  handleResponseError(response, method, url, task) {
    console.error('ERROR ' + method + ' ' + url);
    console.error(response.getResponseCode(), response.getContentText());
  }


  fetchGroups() {
    const url = this.config.url + 'Groups';
    const options = {
      'method': 'GET',
      'muteHttpExceptions': false,
      'headers': {
        'Authorization': this.AccessToken
      },
    };

    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      return JSON.parse(response.getContentText());
    } else {
      this.handleResponseError(response, 'GET', url, 'fetchGroups');
      return [];
    }

  }

}

