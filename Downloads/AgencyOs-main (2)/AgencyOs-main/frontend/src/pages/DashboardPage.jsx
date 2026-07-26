import { useState, useEffect, useCallback } from "react"
import { useAuth, useOrganization, CreateOrganization } from "@clerk/clerk-react"
import { getTasks } from "../services/api"
import KanbanBoard from "../components/KanbanBoard.jsx"


function DashboardPage()
{
    const {getToken} = useAuth()
    const {organization, membership} = useOrganization(
        {memberships : {infinite: true}}
    )
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const memberCount = membership?.count ?? 0
    const orgId = organization?.id
 // Loads tasks from the API using the getTasks function. It sets the loading state to true before making the API call and sets it to false after the call is complete. If an error occurs during the API call, it sets the error state with the error message.
    const loadTasks = useCallback(async() => {
        try{
            setLoading(true)
            setError(null)
            const data = await getTasks(getToken)
            setTasks(data)
        } catch(err){
            setError(err.message)
        }  finally{
            setLoading(false)
        }

    }, [getToken])
// The useEffect hook is used to load tasks when the component mounts or when the orgId or loadTasks function changes. If orgId is present, it calls the loadTasks function to fetch tasks. If orgId is not present, it sets loading to false.
    useEffect(() => {
        if(orgId){
            loadTasks()
        } else {
            setLoading(false)
        }

    },[orgId,loadTasks])

// The component renders different content based on the state of the organization and tasks. If there is no organization, it displays a welcome message and a CreateOrganization component. If there is an organization, it displays the organization's name, member count, and either a loading message, an error message, or the KanbanBoard component with the loaded tasks.
   if (!organization) {
           return <div className={"dashboard-container"}>
               <div className={"no-org-container"}>
                   <h1 className={"no-org-title"}>Welcome to TaskBoard</h1>
                   <p className={"no-org-text"}>
                       Create or join an organization to start managing tasks with your team.
                   </p>
                   <CreateOrganization afterCreateOrganizationUrl={"/dashboard"}/>
               </div>
           </div>
       }
   
       return <div className={"dashboard-container"}>
           <div className={"dashboard-header"}>
               <div>
                   <h1 className={"dashboard-title"}>{organization.name}</h1>
                   <p className={"org-members"}>
                       {memberCount} member{memberCount !== 1 ? "s" : ""}
                   </p>
               </div>
           </div>
   
           {loading ? (
               <p className={"text-muted"}>Loading Tasks...</p>
           ) : error ? (
               <div className={"card-error"}>
                   <p className={"text-error text-error-title"}>Error loading tasks</p>
                   <p className={"text-error text-error-message"}>{error}</p>
               </div>
           ) : (
               <KanbanBoard
                   tasks={tasks}
                   setTasks={setTasks}
                   getToken={getToken}
               />
           )}
       </div>
   }

export default DashboardPage