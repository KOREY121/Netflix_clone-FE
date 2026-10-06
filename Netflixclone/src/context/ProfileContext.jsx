import { createContext, useContext, useState, useEffect } from 'react'
import { getProfiles } from '../api/profiles'

const ProfileContext = createContext(null)

export const ProfileProvider = ({ children }) => {
    const [profiles, setProfiles]           = useState([])
    const [activeProfile, setActiveProfile] = useState(null)

    const loadProfiles = async () => {
        try {
            const res = await getProfiles()
            setProfiles(res.data.results || res.data)
            // Set default profile as active
            const defaultProfile = res.data.results?.find(p => p.is_default)
                || res.data.find?.(p => p.is_default)
                || res.data.results?.[0]
                || res.data[0]
            setActiveProfile(defaultProfile)
        } catch (err) {
            console.error('Failed to load profiles', err)
        }
    }

    return (
        <ProfileContext.Provider value={{
            profiles, activeProfile, setActiveProfile, loadProfiles
        }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)