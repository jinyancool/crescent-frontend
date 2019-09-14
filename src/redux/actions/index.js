const logout = () => ({
  type: 'LOGOUT'
})

const setUser = ({user}) => ({
  type: 'SET_USER',
  payload: {
    user
  }
})

const setProject = ({project}) => ({
  type: 'SET_PROJECT',
  payload: {
    project
  }
})

const setRun = ({run}) => ({
  type: 'SET_RUN',
  payload: {
    run
  }
})

const toggleProjects = () => ({
  type: 'TOGGLE_PROJECTS'
})
const toggleRuns = () => ({
  type: 'TOGGLE_RUNS'
})

const toggleSidebar = ({sidebar}) => ({
  type: 'TOGGLE_SIDEBAR',
  payload: {
    sidebar
  }
})

const setParameters = ({parameters}) => ({
  type: 'SET_PARAMETERS',
  payload: {
    parameters
  }
})

// TOGGLES
// rendering as well
const setActiveProjectKind = ({projectKind}) => ({
  type: 'TOGGLE_PROJECT_ACTIVE_KIND',
  payload: {
    projectKind
  }
})
const setActivePipelineStep = ({step}) => ({
  type: 'TOGGLE_PIPELINE_ACTIVE_STEP',
  payload: {
    step
  }
})
const setActivePipelineParameter = ({parameter}) => ({
  type: 'TOGGLE_PIPELINE_ACTIVE_PARAMETER',
  payload: {
    parameter
  }
})
const setActiveResult = ({result}) => ({
  type: 'TOGGLE_RESULT_ACTIVE_RESULT',
  payload: {
    result
  }
})
const toggle = {
  project: {setActiveProjectKind},
  runs: {},
  vis: {
    dataset: {},
    pipeline: {
      setActivePipelineStep,
      setActivePipelineParameter
    },
    results: {setActiveResult}
  }
}

export default {
  logout,
  setProject,
  setRun,
  setUser,
  toggleProjects,
  toggleRuns,
  toggleSidebar,
  setParameters,

  toggle
}