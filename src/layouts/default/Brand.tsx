import styled from '@emotion/styled';

const BrandWrapper = styled.div`
  transition: 0.5s;
  font-weight: bold;

  span:last-of-type {
    display: inline-block;
    opacity: 0;
  }

  &:hover span:last-of-type {
    transition: 0.5s;
    opacity: 1;
  }
`;

const SubdomainWrapper = styled.span`
  display: inline-block;
  border: 3px solid ${({ theme }) => theme.colors.bright};
  width: 2.25rem;
  text-align: center;
  margin-right: 0.2rem;
  border-radius: 5px;
`;

export default function Brand() {
  return (
    <BrandWrapper>
      <SubdomainWrapper>r.</SubdomainWrapper>obin<span>.ch</span>
    </BrandWrapper>
  );
}
