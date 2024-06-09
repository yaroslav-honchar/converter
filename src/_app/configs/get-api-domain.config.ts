export const getApiDomainConfig = () => {
  const apiSelfDomain = process.env.NEXT_PUBLIC_API_SELF_DOMAIN
  if (!apiSelfDomain) {
    throw new Error("[apiSelfDomain] did not found in environment configuration")
  }

  return apiSelfDomain
}
