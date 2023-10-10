import React from 'react'

const UserDetails = React.createContext({
  userEmails: 'rahul',
  onEnterUserDetails: () => {},
  activeTab: 'Home',
  onChangeTab: () => {},
})

export default UserDetails
