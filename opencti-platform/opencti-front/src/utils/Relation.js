import { append } from 'ramda';

const relationsTypesMapping = {
  'Attack-Pattern_Malware': ['delivers', 'uses'],
  'Attack-Pattern_Sector': ['targets'],
  'Attack-Pattern_Organization': ['targets'],
  'Attack-Pattern_Individual': ['targets'],
  'Attack-Pattern_Region': ['targets'],
  'Attack-Pattern_Country': ['targets'],
  'Attack-Pattern_City': ['targets'],
  'Attack-Pattern_Position': ['targets'],
  'Attack-Pattern_Vulnerability': ['targets'],
  'Attack-Pattern_Tool': ['uses'],
  'Campaign_Intrusion-Set': ['attributed-to'],
  'Campaign_Threat-Actor': ['attributed-to'],
  Campaign_Infrastructure: ['compromises', 'uses'],
  Campaign_Region: ['originates-from', 'targets'],
  Campaign_Country: ['originates-from', 'targets'],
  Campaign_City: ['originates-from', 'targets'],
  Campaign_Position: ['originates-from', 'targets'],
  Campaign_Sector: ['targets'],
  Campaign_Organization: ['targets'],
  Campaign_Individual: ['targets'],
  Campaign_Vulnerability: ['targets'],
  'Campaign_Attack-Pattern': ['uses'],
  Campaign_Malware: ['uses'],
  Campaign_Tool: ['uses'],
  'Course-Of_Action_Indicator': ['investigates', 'mitigates'],
  'Course-Of_Action_Attack-Pattern': ['mitigates'],
  'Course-Of_Action_Malware': ['mitigates'],
  'Course-Of_Action_Tool': ['mitigates'],
  'Course-Of_Action_Vulnerability': ['mitigates'],
  Sector_Region: ['located-at'],
  Sector_Country: ['located-at'],
  Sector_City: ['located-at'],
  Sector_Position: ['located-at'],
  Organization_Region: ['located-at'],
  Organization_Country: ['located-at'],
  Organization_City: ['located-at'],
  Organization_Position: ['located-at'],
  Individual_Region: ['located-at'],
  Individual_Country: ['located-at'],
  Individual_City: ['located-at'],
  Individual_Position: ['located-at'],
  'Indicator_Attack-Pattern': ['indicates'],
  Indicator_Campaign: ['indicates'],
  Indicator_Infrastructure: ['indicates'],
  'Indicator_Intrusion-Set': ['indicates'],
  Indicator_Malware: ['indicates'],
  'Indicator_Threat-Actor': ['indicates'],
  Indicator_Tool: ['indicates'],
  'Indicator_Observed-Data': ['based-on'],
  Infrastructure_Infrastructure: [
    'communicates-with',
    'consists-of',
    'controls',
    'uses',
  ],
  'Infrastructure_IPv4-Addr': ['communicates-with'],
  'Infrastructure_IPv6-Addr': ['communicates-with'],
  'Infrastructure_Domain-Name': ['communicates-with'],
  Infrastructure_Url: ['communicates-with'],
  'Infrastructure_Observed-Data': ['consists-of'],
  // TODO
  'Infrastructure_Stix-Cyber-Observable': ['consists-of'],
  Infrastructure_Malware: ['controls', 'delivers', 'hosts'],
  Infrastructure_Vulnerability: ['has'],
  Infrastructure_Tool: ['hosts'],
  Infrastructure_Region: ['located-at'],
  Infrastructure_Country: ['located-at'],
  Infrastructure_City: ['located-at'],
  Infrastructure_Position: ['located-at'],
  'Intrusion-Set_Threat-Actor': ['attributed-to', 'targets'],
  'Intrusion-Set_Infrastructure': ['compromises', 'hosts', 'own', 'uses'],
  'Intrusion-Set_Region': ['originates-from', 'targets'],
  'Intrusion-Set_Country': ['originates-from', 'targets'],
  'Intrusion-Set_City': ['originates-from', 'targets'],
  'Intrusion-Set_Position': ['originates-from', 'targets'],
  'Intrusion-Set_Sector': ['targets'],
  'Intrusion-Set_Organization': ['targets'],
  'Intrusion-Set_Individual': ['targets'],
  'Intrusion-Set_Vulnerability': ['targets'],
  'Intrusion-Set_Attack-Pattern': ['uses'],
  'Intrusion-Set_Malware': ['uses'],
  'Intrusion-Set_Tool': ['uses'],
  'Malware_attack-pattern': ['uses'],
  'Malware_Threat-Actor': ['authored-by'],
  'Malware_Intrusion-Set': ['authored-by'],
  Malware_Infrastructure: ['beacons-to', 'exfiltrate-to', 'targets', 'uses'],
  'Malware_IPv4-Addr': ['communicates-with'],
  'Malware_IPv6-Addr': ['communicates-with'],
  'Malware_Domain-Name': ['communicates-with'],
  Malware_Url: ['communicates-with'],
  Malware_Malware: ['controls', 'downloads', 'drops', 'uses', 'variant-of'],
  Malware_Tool: ['downloads', 'drops', 'uses'],
  Malware_StixFile: ['downloads', 'drops'],
  Malware_Vulnerability: ['exploits', 'targets'],
  Malware_Region: ['originates-from', 'targets'],
  Malware_Country: ['originates-from', 'targets'],
  Malware_City: ['originates-from', 'targets'],
  Malware_Position: ['originates-from', 'targets'],
  Malware_Sector: ['targets'],
  Malware_Organization: ['targets'],
  Malware_Individual: ['targets'],
  'Malware_Attack-Pattern': ['uses'],
  'Threat-Actor_Organization': ['attributed-to', 'impersonates', 'targets'],
  'Threat-Actor_Individual': ['attributed-to', 'impersonates', 'targets'],
  'Threat-Actor_Sector': ['targets'],
  'Threat-Actor_Infrastructure': ['compromises', 'hosts', 'owns', 'uses'],
  'Threat-Actor_Region': ['located-at', 'targets'],
  'Threat-Actor_Country': ['located-at', 'targets'],
  'Threat-Actor_City': ['located-at', 'targets'],
  'Threat-Actor_Position': ['located-at', 'targets'],
  'Threat-Actor_Attack-Pattern': ['uses'],
  'Threat-Actor_Malware': ['uses'],
  'Threat-Actor_Tool': ['uses'],
  Tool_Malware: ['uses', 'drops', 'delivers'],
  Tool_Vulnerability: ['has', 'targets'],
  Tool_Sector: ['targets'],
  Tool_Organization: ['targets'],
  Tool_Individual: ['targets'],
  Tool_Region: ['targets'],
  Tool_Country: ['targets'],
  Tool_City: ['targets'],
  Tool_Position: ['targets'],
  'X-OpenCTI-Incident_Intrusion-Set': ['attributed-to'],
  'X-OpenCTI-Incident_Threat-Actor': ['attributed-to'],
  'X-OpenCTI-Incident_Campaign': ['attributed-to'],
  'X-OpenCTI-Incident_Infrastructure': ['compromises', 'uses'],
  'X-OpenCTI-Incident_Region': ['originates-from', 'targets'],
  'X-OpenCTI-Incident_Country': ['originates-from', 'targets'],
  'X-OpenCTI-Incident_City': ['originates-from', 'targets'],
  'X-OpenCTI-Incident_Position': ['originates-from', 'targets'],
  'X-OpenCTI-Incident_Sector': ['targets'],
  'X-OpenCTI-Incident_Organization': ['targets'],
  'X-OpenCTI-Incident_Individual': ['targets'],
  'X-OpenCTI-Incident_Vulnerability': ['targets'],
  'X-OpenCTI-Incident_Attack-Pattern': ['uses'],
  'X-OpenCTI-Incident_Malware': ['uses'],
  'X-OpenCTI-Incident_Tool': ['uses'],
  Country_Region: ['located-at'],
  City_Country: ['located-at'],
  Position_City: ['located-at'],
  Directory_Directory: ['contains'],
  Directory_StixFile: ['contains'],
  'Email-Addr_User-Account': ['belongs-to'],
  'Email-Message_Email-Addr': ['from', 'sender', 'to', 'bcc'],
  'Email-Message_Email-Mime-Part-Type': ['body-multipart'],
  'Email-Message_Email-Artifact': ['raw-email'],
  'Email-Mime-Part-Type_Artifact': ['body-raw'],
  StixFile_Directory: ['parent-directory', 'contains'],
  StixFile_Artifact: ['relation-content'],
  'IPv4-Addr_Domain-Name': ['resolves-to'],
  'IPv4-Addr_Mac-Addr': ['belongs-to'],
  'IPv6-Addr_Domain-Name': ['resolves-to'],
  'IPv6-Addr_Mac-Addr': ['belongs-to'],
  'Network-Traffic_IPv4-Addr': ['src', 'dst'],
  'Network-Traffic_IPv6-Addr': ['src', 'dst'],
};

export const resolveRelationsTypes = (fromType, toType, relatedTo = true) => {
  if (relatedTo) {
    return relationsTypesMapping[`${fromType}_${toType}`]
      ? append('related-to', relationsTypesMapping[`${fromType}_${toType}`])
      : ['related-to'];
  }
  return relationsTypesMapping[`${fromType}_${toType}`]
    ? relationsTypesMapping[`${fromType}_${toType}`]
    : [];
};
