# Well, shell sucks
# todo [snow]: fix all using http://mywiki.wooledge.org/BashPitfalls https://wiki.bash-hackers.org/start

export plumsailDockerName="snowinmars"

# logs volume
export plumsailLogsVolumeName="plumsailLogs"
export plumsailLogsVolumeHostPath="/home/${USER}/plumsail/logs"

# network
export plumsailNetworkName="plumsail"
export plumsailNetworkSubnet="172.20.0.0/16"

# containers
export plumsailDbIp="172.20.0.20"
export plumsailDbHostPort=5432
export plumsailDbContainerPort=5432
export plumsailDb="$plumsailDockerName/plumsail-db"
export plumsailDatabaseName="plumsail"
export plumsailDatabaseUser="postgres"

export plumsailBeIp="172.20.0.21"
export plumsailBeHostPort=5002
export plumsailBeContainerPort=5002
export plumsailBePublicUrl="http://localhost:5002"
export plumsailBe="$plumsailDockerName/plumsail-be"

export plumsailFeIp="172.20.0.22"
export plumsailFeHostPort=80
export plumsailFeContainerPort=3000
export plumsailFe="$plumsailDockerName/plumsail-fe"

