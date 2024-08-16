$oldPath = [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine)
if ($oldPath.Split(';') -inotcontains 'C:\stripe'){
  [Environment]::SetEnvironmentVariable('Path', $('{0};C:\stripe' -f $oldPath), [EnvironmentVariableTarget]::Machine)
}