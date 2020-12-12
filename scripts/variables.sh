# Well, shell sucks
# todo [snow]: fix all using http://mywiki.wooledge.org/BashPitfalls https://wiki.bash-hackers.org/start

export plumsailDockerName="snowinmars"

# psql volume
export plumsailDatabaseVolumeName="plumsailPsql"
export plumsailDatabaseVolumeHostPath="/home/${USER}/plumsail/psql" # you will not have permissions to read this folder

# logs volume
export plumsailLogsVolumeName="plumsailLogs"
export plumsailLogsVolumeHostPath="/home/${USER}/plumsail/logs"

# network
export plumsailNetworkName="plumsail"
export plumsailNetworkSubnet="172.21.0.0/16"

# containers
export plumsailDbIp="172.21.0.20"
export plumsailDbHostPort=5432
export plumsailDbContainerPort=5432
export plumsailDb="$plumsailDockerName/plumsail-db"
export plumsailDatabaseName="plumsail"
export plumsailDatabaseUser="postgres"

export plumsailBeIp="172.21.0.21"
export plumsailBeHostPort=5002
export plumsailBeContainerPort=5002
export plumsailBePublicUrl="http://localhost:5002"
export plumsailBe="$plumsailDockerName/plumsail-be"

export plumsailFeIp="172.21.0.22"
export plumsailFeHostPort=80
export plumsailFeContainerPort=3000
export plumsailFe="$plumsailDockerName/plumsail-fe"
export yandexDiskOauthToken="token"

