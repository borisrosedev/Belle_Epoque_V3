$oldPath = [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine)
if ($oldPath.Split(';') -inotcontains 'C:\kompose'){
  [Environment]::SetEnvironmentVariable('Path', $('{0};C:\kompose' -f $oldPath), [EnvironmentVariableTarget]::Machine)
}